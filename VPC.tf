
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
    enable_dns_hostnames = true

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

output "nat_gateway_ip"{
    value = aws_eip.NATElasticIP.public_ip
}

 resource "aws_instance" "server"{
     ami    = "ami-0ed9277fb7eb570c9"
     instance_type = "t2.micro"
     private_ip =  "10.0.112.0"
     subnet_id = aws_subnet.privatesubnet.id
     vpc_security_group_ids = [aws_security_group.NATGroup.id]
 }
 resource "aws_security_group" "NATGroup"{
  name = "allow_nat"
  vpc_id  = aws_vpc.Main.id
   
   ingress {
    from_port  = 22
    to_port    = 22
    protocol   = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
   }
   egress {
       from_port = 0
       to_port   = 0
       protocol  =  "-1"
       cidr_blocks = ["0.0.0.0/0"]
   }
 }