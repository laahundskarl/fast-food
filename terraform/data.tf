# Data sources para recursos AWS pré-existentes

# VPC
data "aws_vpc" "existing" {
  default = true
}

# Subnets específicas existentes para o EKS
data "aws_subnet" "fastfood_subnet_1a" {
  id = "subnet-08d34ed68511f3917"  # us-east-1a
}

data "aws_subnet" "fastfood_subnet_1b" {
  id = "subnet-07fe020cefc4bd241"  # us-east-1b
}

# Lista das subnets para o EKS
locals {
  eks_subnet_ids = [
    data.aws_subnet.fastfood_subnet_1a.id,  # us-east-1a
    data.aws_subnet.fastfood_subnet_1b.id,  # us-east-1b
  ]
}

# Para compatibilidade com o módulo EKS
data "aws_subnets" "default" {
  filter {
    name   = "subnet-id"
    values = local.eks_subnet_ids
  }
}

# IAM Roles
data "aws_iam_role" "eks_cluster_role" {
  name = "LabRole"
}

data "aws_iam_role" "eks_node_role" {
  name = "LabRole"
}
