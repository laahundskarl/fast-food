# Data sources para recursos AWS pré-existentes

# VPC
data "aws_vpc" "existing" {
  default = true
}

# Subnets específicas nas zonas suportadas pelo EKS
data "aws_subnet" "subnet_1f" {
  id = "subnet-065d07b98853c6e85"  # us-east-1f ✅
}

data "aws_subnet" "subnet_1c" {
  id = "subnet-006a299acd884db5f"  # us-east-1c ✅
}

data "aws_subnet" "subnet_1d" {
  id = "subnet-019c9a98873884521"  # us-east-1d ✅
}

data "aws_subnet" "subnet_1a" {
  id = "subnet-04472ffa6aca60cd3"  # us-east-1a ✅
}

data "aws_subnet" "subnet_1b" {
  id = "subnet-0d2764f0ca6f32302"  # us-east-1b ✅
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
  name = "c164102a4216989l11111876t1w288445-LabEksClusterRole-qxAkucJNYFuF"
}

data "aws_iam_role" "eks_node_role" {
  name = "LabRole"
}
