terraform {
    required_providers {
      aws = {
          source = "hashicorp/aws"
          version = "~> 3.5.0"
      }
    }
    
}
provider "aws"{
region = "us-east-1"
}
variable "function_name" {
    type = string
    default = "S3LambdatoDynaomDB"
}

variable "handler_name" {
    type = string
    default="index.handler"
}

variable "runtime" {
    type = string
    default="nodejs12.x"
}

variable "table_name" {
    type = string
    default = "T-Users"
}
variable "filter_suffix" {
    type = string
    default= ".json"
}

variable "bucket_name" {
  type        = string
  default     = "test-bucket-aws-jared-v1-terraform"
}

resource "aws_s3_bucket" "demos3" {
    bucket = "test-bucket-aws-jared-v1-terraform" 
     
}
resource "aws_lambda_permission" "test"{
statement_id   = "AllowS3Invoke"
action         = "lambda:InvokeFunction"
function_name  = "${aws_lambda_function.test_lamdba.arn}"
principal      =  "s3.amazonaws.com"
source_arn     =  "${aws_s3_bucket.demos3.arn}"
}
resource "aws_s3_bucket_notification" "bucket_notification" {
bucket = "${aws_s3_bucket.demos3.id}"

lambda_function { 
lambda_function_arn = "${aws_lambda_function.test_lamdba.arn}"
events              = ["s3:ObjectCreated:Put"]
filter_suffix       = "${var.filter_suffix}" 
}
}

resource "aws_lambda_function" "test_lamdba" {
filename          = "S3toDynamo.zip"
handler           = "${var.handler_name}"
function_name     = "${var.function_name}"
role              = aws_iam_role.iamforlambdatf.arn
runtime           = "${var.runtime}"
}


     
resource "aws_iam_role" "iamforlambdatf" {
  assume_role_policy      = "${file("Role1.json")}"
}         
           
resource "aws_iam_role_policy" "inlinepolicyone" {
  name = "inlinepolicyone"
  role =  "${aws_iam_role.iamforlambdatf.id}"
  policy = "${file("Role2.json")}"
}
resource "aws_iam_role_policy" "inlinepolicytwo" {
  name = "inlinepolicytwo"
  role =  "${aws_iam_role.iamforlambdatf.id}"
  policy = "${file("Role3.json")}"
}
resource "aws_iam_role_policy" "inlinepolicythree" {
  name = "inlinepolicythree"
  role =  "${aws_iam_role.iamforlambdatf.id}"
  policy = "${file("Role4.json")}"
}

resource "aws_dynamodb_table" "T-Users"{
name                        = "${var.table_name}"
read_capacity               =  5
write_capacity              =  5
hash_key                    = "id"
attribute{
name = "id"
type = "S"
}



}