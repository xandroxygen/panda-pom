variable "bucket_site" {
  default = "pandapom.inseng.net"
}
variable "region" {
  default = "us-west-2"
}
variable "route53_domain_name" {
  default = "pandapom.inseng.net"
}
variable "route53_domain_zoneid" {
  default = "ZWJNQ11L4W52U"
}

provider "aws" {
    region = "${var.region}"
}

resource "aws_s3_bucket" "site" {
    bucket = "${var.bucket_site}"
    acl = "public-read"
    policy = <<EOF
{
  "Id": "bucket_policy_site",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "bucket_policy_site_main",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${var.bucket_site}/*",
      "Principal": "*"
    }
  ]
}
EOF
    website {
        index_document = "index.html"
        error_document = "404.html"
    }
    tags {
    }
    force_destroy = true
}

resource "aws_route53_record" "domain" {
   name = "${var.route53_domain_name}"
   zone_id = "${var.route53_domain_zoneid}"
   type = "A"
   alias {
      name                   = "${aws_s3_bucket.site.website_domain}"
      zone_id                = "${aws_s3_bucket.site.hosted_zone_id}"
      evaluate_target_health = true
    }
}