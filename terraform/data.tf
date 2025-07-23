# Data sources para recursos AWS pré-existentes

# VPC
data "aws_vpc" "existing" {
  default = true
}

# Subnets específicas nas zonas suportadas pelo EKS
data "aws_subnet" "subnet_1f" {
  id = "subnet-0da91483865014bef"  # us-east-1f ✅
}

data "aws_subnet" "subnet_1c" {
  id = "subnet-074876d42752a79ae"  # us-east-1c ✅
}

data "aws_subnet" "subnet_1d" {
  id = "subnet-0ba9399af9a1a7d11"  # us-east-1d ✅
}

data "aws_subnet" "subnet_1a" {
  id = "subnet-0fd67216a345546b0"  # us-east-1a ✅
}

data "aws_subnet" "subnet_1b" {
  id = "subnet-0e08eaae3d9680667"  # us-east-1b ✅
}

# Lista apenas das subnets suportadas pelo EKS
locals {
  eks_subnet_ids = [
    data.aws_subnet.subnet_1a.id,  # us-east-1a
    data.aws_subnet.subnet_1b.id,  # us-east-1b  
    data.aws_subnet.subnet_1c.id,  # us-east-1c
    data.aws_subnet.subnet_1d.id,  # us-east-1d
    data.aws_subnet.subnet_1f.id,  # us-east-1f
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
  name = "c164098a4216965l10887587t1w601273-LabEksClusterRole-DYiSDE8HyhXO"
}

data "aws_iam_role" "eks_node_role" {
  name = "LabRole"
}
