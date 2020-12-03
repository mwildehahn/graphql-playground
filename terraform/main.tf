terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

resource "aws_iam_user" "api" {
  name = "${var.app}-api-${var.environment}"
  path = "/${var.environment}/"
}

resource "aws_iam_access_key" "api" {
  user    = aws_iam_user.api.name
  pgp_key = "keybase:mhahn"
}

resource "aws_dynamodb_table" "user" {
  name         = var.user_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "emailIndex"
    hash_key        = "email"
    projection_type = "ALL"
  }

  tags = {
    Environment = var.environment
  }
}

resource "aws_iam_user_policy" "api" {
  name = "${var.app}-api-db-${var.environment}"
  user = aws_iam_user.api.name

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:DeleteItem"
            ],
            "Effect": "Allow",
            "Resource": "${aws_dynamodb_table.user.arn}"
        },
        {
            "Action": [
                "dynamodb:Query"
            ],
            "Effect": "Allow",
            "Resource": "${aws_dynamodb_table.user.arn}/*"
        }
    ]
}
EOF
}

output "api_access_key_id" {
  value = aws_iam_access_key.api.id
}

output "api_secret_access_key" {
  value = aws_iam_access_key.api.encrypted_secret
}
