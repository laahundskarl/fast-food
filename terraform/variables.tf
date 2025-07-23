variable "aws_region" {
  default = "us-east-1"
}

variable "cluster_name" {
  default = "fast-food-cluster-prd"
}

variable "cluster_version" {
  default = "1.33"
}

variable "node_instance_type" {
  default = "t3.small"  # Mudança para mais recursos
}