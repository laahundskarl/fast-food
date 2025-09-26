#!/bin/bash
set -e

echo "[0/14] Configurando kubectl para o cluster EKS..."
aws eks update-kubeconfig --region us-east-1 --name fast-food-cluster-prd

echo "[1/14] Obtendo URI do ECR..."
cd ../terraform
ECR_URI=$(terraform output -raw ecr_repository_url 2>/dev/null)
cd ../k8s

if [ -z "$ECR_URI" ]; then
    echo "⚠️  Erro: Não foi possível obter ECR URI do terraform output"
    echo "Execute: cd ../terraform && terraform output ecr_repository_url"
    exit 1
fi

echo "📦 Usando imagem: $ECR_URI:latest"

echo "[2/14] Aplicando PVC do MySQL..."
kubectl apply -f 02-mysql-pvc.yaml

echo "[3/14] Deploy do MySQL..."
kubectl apply -f 03-mysql-deployment.yaml
kubectl apply -f 04-mysql-service.yaml

echo "[4/14] Aguardando MySQL ficar pronto..."
kubectl wait --for=condition=Ready pod -l app=mysql --timeout=300s

echo "[5/14] Deploy do serviço da API e LoadBalancer..."
kubectl apply -f 06-api-service.yaml
kubectl apply -f 07-loadbalancer.yaml

echo "[6/14] Aguardando LoadBalancer obter External IP..."
# Aguardar até 5 minutos pelo LoadBalancer
LOADBALANCER_URL=""
for i in {1..30}; do
    LOADBALANCER_URL=$(kubectl get svc fastfood-api-loadbalancer -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null)
    if [ ! -z "$LOADBALANCER_URL" ]; then
        echo "✅ LoadBalancer pronto: $LOADBALANCER_URL"
        break
    fi
    echo "Aguardando LoadBalancer... tentativa $i/30"
    sleep 10
done

if [ -z "$LOADBALANCER_URL" ]; then
    echo "⚠️  LoadBalancer ainda não tem External IP. Usando valor existente..."
    LOADBALANCER_URL="a7a9258de2e8b4c638f8214ce6360ffc-609270677.us-east-1.elb.amazonaws.com"
fi

echo "[7/14] Aplicando ConfigMap com URL dinâmica..."
# Exportar variáveis para envsubst
export LOADBALANCER_URL="$LOADBALANCER_URL"

# Substituir variáveis e aplicar
envsubst < 01-config.yaml | kubectl apply -f -

echo "[8/14] Deploy da API..."
# Exportar variáveis para API
export ECR_URI="$ECR_URI"
export IMAGE_TAG="latest"

# Substituir variáveis e aplicar
envsubst < 05-api-deployment.yaml | kubectl apply -f -

echo "[9/14] Verificando se precisa reiniciar deployments..."
if kubectl get deployment fastfood-api >/dev/null 2>&1 && [ "$(kubectl get deployment fastfood-api -o jsonpath='{.status.replicas}')" -gt 0 ]; then
    echo "Deployment já existe - forçando restart para pegar nova imagem e configs..."
    kubectl rollout restart deployment/fastfood-api
    kubectl rollout status deployment/fastfood-api --timeout=300s
else
    echo "Primeiro deploy detectado - aguardando pods ficarem prontos..."
    kubectl wait --for=condition=Ready pod -l app=fastfood-api --timeout=300s
fi

echo "[10/14] Executando migrations do banco de dados..."
API_POD=$(kubectl get pods -l app=fastfood-api -o jsonpath="{.items[0].metadata.name}")
kubectl exec $API_POD -- npx prisma migrate deploy
echo "Migrations executadas com sucesso!"

echo "[11/14] Instalando Metrics Server oficial..."
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

echo "[12/14] Aguardando Metrics Server ficar pronto..."
kubectl wait --for=condition=Ready pod -l k8s-app=metrics-server -n kube-system --timeout=300s

echo "[13/14] Deploy do serviço da API e LoadBalancer..."
kubectl apply -f 06-api-service.yaml
kubectl apply -f 07-loadbalancer.yaml

echo "[14/14] Deploy do HPA..."
kubectl apply -f 08-hpa.yaml

echo "\n[✅] Deploy finalizado com sucesso!\n"
kubectl get pods
kubectl get svc
kubectl get hpa
