resource "aws_ecr_repository" "fastfood_api" {
  name         = "fastfood-api"
  force_delete = true  # Permite deletar mesmo com imagens
}