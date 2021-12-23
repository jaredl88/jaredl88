
provider "aws"{
alias = "vpc"
region = "us-east-1"
}


variable "main_vpc_cidr" {
    type = string
    default = "10.0.0.0/16"
}
variable "public_subnet_cidr" {
    type = string
    default = "10.0.128.0/17"
}
variable "private_subnet_cidr" {
    type = string
    default = "10.0.0.0/17"
}
resource "aws_vpc" "Main" {
    cidr_block        = "${var.main_vpc_cidr}"
    instance_tenancy  = "default"

}
resource "aws_internet_gateway" "IGateWay"{
vpc_id = aws_vpc.Main.id
}
resource "aws_subnet" "publicsubnet"{
    vpc_id           = aws_vpc.Main.id
    cidr_block       = "${var.public_subnet_cidr}"
}
resource "aws_subnet" "privatesubnet"{
    vpc_id           = aws_vpc.Main.id
    cidr_block       = "${var.private_subnet_cidr}"
}
 resource "aws_route_table" "PublicRouteTable" {    
    vpc_id =  aws_vpc.Main.id
         route {
    cidr_block = "0.0.0.0/0"              
    gateway_id = aws_internet_gateway.IGateWay.id
     }
 }
 resource "aws_route_table" "PrivateRouteTable" {    
   vpc_id = aws_vpc.Main.id
   route {
   cidr_block = "0.0.0.0/0"             
   nat_gateway_id = aws_nat_gateway.NATGateway.id
   }
 }
 resource "aws_route_table_association" "PublicTableAssociation"{
     subnet_id = aws_subnet.publicsubnet.id
     route_table_id = aws_route_table.PublicRouteTable.id
 }
 resource "aws_route_table_association" "PrivateTableAssociation"{
     subnet_id = aws_subnet.privatesubnet.id
     route_table_id = aws_route_table.PrivateRouteTable.id
 }
 resource "aws_eip" "NATElasticIP"{
     vpc = true
 }
 resource "aws_nat_gateway" "NATGateway"{
     allocation_id = aws_eip.NATElasticIP.id
     subnet_id = aws_subnet.publicsubnet.id
 }
 
 resource "aws_instance" "server"{
     ami    = "ami-0ed9277fb7eb570c9"
     instance_type = "t2.micro"
     private_ip =  "10.0.112.0"
     subnet_id = aws_subnet.privatesubnet.id
 }