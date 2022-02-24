const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';


async function getTask(){
    const userName = 'jared';
    const userTable = 'todoUsers';
    try {
        var params = {
            KeyConditionExpression: 'username = :user',
            ExpressionAttributeValues: {
                ':user': userName
            },
            TableName: userTable
        };
        var result = await dynamodb.query(params).promise()
        return JSON.stringify(result);
    } catch (error) {
        console.error(error);
    }


}
module.exports.getTask = getTask;
