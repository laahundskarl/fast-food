#!/bin/bash
set -e

echo "[1/10] Aplicando configmap e secrets..."
kubectl apply -f 01-config.yaml

echo "[2/10] Aplicando PVC do MySQL..."
kubectl apply -f 02-mysql-pvc.yaml

echo "[3/10] Deploy do MySQL..."
kubectl apply -f 03-mysql-deployment.yaml
kubectl apply -f 04-mysql-service.yaml

echo "[4/10] Aguardando MySQL ficar pronto..."
kubectl wait --for=condition=Ready pod -l app=mysql --timeout=300s

echo "[5/10] Deploy da API..."
kubectl apply -f 05-api-deployment.yaml

echo "[6/10] Instalando Metrics Server oficial..."
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

echo "[7/10] Aguardando Metrics Server ficar pronto..."
kubectl wait --for=condition=Ready pod -l k8s-app=metrics-server -n kube-system --timeout=300s

echo "[8/10] Deploy do serviço da API e LoadBalancer..."
kubectl apply -f 06-api-service.yaml
kubectl apply -f 07-loadbalancer.yaml

echo "[9/10] Deploy do HPA..."
kubectl apply -f 08-hpa.yaml

echo "\nDeploy finalizado!\n"
kubectl get pods
kubectl get svc
kubectl get hpa
