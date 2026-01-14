# Infrastructure for hosting User Generated Sites (S3 + CloudFront)
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider aws {
  region = "us-east-1"
}

# S3 Bucket for Static Website Hosting
resource "aws_s3_bucket" "user_sites" {
  bucket = "ai-portfolio-user-sites-prod"
}

resource "aws_s3_bucket_public_access_block" "allow_public" {
  bucket = aws_s3_bucket.user_sites.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# CloudFront Distribution for Global Edge Delivery
resource "aws_cloudfront_distribution" "site_cdn" {
  origin {
    domain_name = aws_s3_bucket.user_sites.bucket_regional_domain_name
    origin_id   = "S3-UserSites"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-UserSites"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.site_cdn.domain_name
}