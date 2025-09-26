# Security group rule para permitir MySQL no security group do EKS
resource "aws_security_group_rule" "rds_mysql_access" {
  type                     = "ingress"
  from_port                = 3306
  to_port                  = 3306
  protocol                 = "tcp"
  source_security_group_id = module.eks.node_security_group_id
  security_group_id        = module.eks.node_security_group_id
  description              = "MySQL access within EKS cluster"
}

resource "aws_db_subnet_group" "fastfood_mysql" {
  name       = "fastfood-db-subnet-group"
  subnet_ids = local.eks_subnet_ids

  tags = {
    Name = "fastfood-db-subnet-group"
  }
}

resource "aws_db_instance" "fastfood_mysql" {
  identifier = "fastfood-db"
  
  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  
  allocated_storage = 10
  storage_type     = "gp2"
  storage_encrypted = false
  
  db_name  = "fastfood"
  username = "admin"
  password = "admin123"
  port     = 3306

  vpc_security_group_ids = [module.eks.node_security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.fastfood_mysql.name
  
  # RDS privado - apenas acessível dentro da VPC
  publicly_accessible    = false
  
  multi_az                = false
  backup_retention_period = 0
  auto_minor_version_upgrade = false
  
  deletion_protection = false
  skip_final_snapshot = true
  
  tags = {
    Name = "fastfood-rds"
  }
}

output "rds_endpoint" {
  description = "Endpoint do RDS MySQL"
  value       = aws_db_instance.fastfood_mysql.endpoint
}

output "rds_database_name" {
  description = "Nome do banco de dados"
  value       = aws_db_instance.fastfood_mysql.db_name
}

output "rds_security_group_id" {
  description = "Security Group ID do RDS (mesmo do EKS)"
  value       = module.eks.node_security_group_id
}