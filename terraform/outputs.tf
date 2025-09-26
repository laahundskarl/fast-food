# Outputs para facilitar o uso dos recursos criados

output "ecr_repository_url" {
  description = "URL do repositório ECR"
  value       = aws_ecr_repository.fastfood_api.repository_url
}

output "ecr_repository_arn" {
  description = "ARN do repositório ECR"
  value       = aws_ecr_repository.fastfood_api.arn
}

output "cluster_name" {
  description = "Nome do cluster EKS"
  value       = module.eks.cluster_id
}

output "cluster_endpoint" {
  description = "Endpoint do cluster EKS"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "ID do security group do cluster"
  value       = module.eks.cluster_security_group_id
}

output "node_security_group_id" {
  description = "Security Group ID dos nodes EKS"
  value       = module.eks.node_security_group_id
}

output "cluster_arn" {
  description = "ARN do cluster EKS"
  value       = module.eks.cluster_arn
}

output "vpc_id" {
  description = "ID da VPC"
  value       = data.aws_vpc.existing.id
}

output "eks_subnet_ids" {
  description = "IDs das subnets usadas pelo EKS"
  value       = local.eks_subnet_ids
}
