- 👋 Hi, I’m @jaredl88
- 👀 I’m interested in Cloud Architecture
- 🌱 I’m currently learning AWS Solution Archicture
- 💞️ I’m looking to collaborate on Cloudformation Architectures
- 📫 How to reach me jaredl88@hotmail.com
Code for lambda function taken from https://github.com/jspruance/cloudpath-tutorials/blob/master/aws-serverless/aws-s3-lambda-tutorial/putUserDataFromS3/index.js
<!---
jaredl88/jaredl88 is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->

AWSTemplateFormatVersion: "2010-09-09"
Description: Example Stack
 
Parameters:
  BucketID:
    Type: String
    Default: s3-lambda-dynamo-jaredl-v1
  DynamoTableName:
    Type: String
    Default: CFUsers
Resources:
  S3Bucket:
    Type: AWS::S3::Bucket
    DependsOn: S3InvokeLambdaPermission
    Properties:
       BucketName: !Ref BucketID
       NotificationConfiguration:
        LambdaConfigurations:
          - Event: s3:ObjectCreated:*
            Function: !GetAtt S3LambdaFunction.Arn 
            Filter:
              S3Key:
                Rules:
                  - Name: suffix
                    Value: .json
                 
 
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
        - Effect: Allow
          Principal:
            Service:
            - lambda.amazonaws.com
          Action:
          - sts:AssumeRole
      Policies:
        - PolicyName: S3GetObjects
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
            - Effect: Allow
              Action:
              - logs:Create*
              - logs:PutLogEvents
              - s3:GetObject
              - s3:PutObject
              - s3:GetBucketNotification
              - s3:PutBucketNotification
              Resource:
              - arn:aws:s3:::*
              - arn:aws:logs:*:*:*
            - Effect: Allow
              Action:
              - dynamodb:PutItem
              Resource: arn:aws:dynamodb:*:*:table/CFUsers

  S3LambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Description: Puts S3 json into db
      Runtime: nodejs14.x
      FunctionName: S3LambdaFunction
      Code:
        ZipFile: |
            const AWS = require('aws-sdk');
            const s3 = new AWS.S3();
            const documentClient = new AWS.DynamoDB.DocumentClient();

            exports.handler = async (event) => {
            let statusCode = 0;
            let responseBody = '';

              
            const { name } = event.Records[0].s3.bucket;
            const { key } = event.Records[0].s3.object;

            const getObjectParams = {

              Bucket:name,

              Key:key

              };

            try {
              const s3Data = await s3.getObject(getObjectParams).promise();
              const usersStr = s3Data.Body.toString();
              const usersJSON = JSON.parse(usersStr);
              console.log(`Users ::: ${usersStr}`);

            await Promise.all(usersJSON.map(async user => {
              const { id, firstname, lastname } = user;  

                const putParams= {
                TableName: "CFUsers",
                 Item:{

                      id: id,

                      firstname: firstname,

                      lastname: lastname

                      }
                    };

              await documentClient.put(putParams).promise();
             
              }));

              responseBody = 'Success';
              statusCode = 201;
             
              } catch(err) {

                responseBody = 'Error adding users';
                statusCode = 403;

                }
              const response = {
                statusCode:statusCode,
                body:responseBody
                };
              return response
              };
      Role: !GetAtt LambdaExecutionRole.Arn
   
  S3InvokeLambdaPermission:
    Type: AWS::Lambda::Permission
    Properties:
        Action: lambda:InvokeFunction
        FunctionName: !GetAtt  S3LambdaFunction.Arn
        Principal: s3.amazonaws.com
        SourceArn: !Sub 'arn:aws:s3:::${BucketID}' 

  TableOfUsers:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
      - AttributeName: id
        AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      TableName: !Ref DynamoTableName
