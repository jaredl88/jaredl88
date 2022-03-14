const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';


async function getTask(event){
    const username = event.username;
    const getResponse = await getTasks(username);
    if(!getResponse)
    {
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
    })
    }
    return util.buildResponse(200,{
          getResponse
});

}
async function getTasks(username){
    const userName = username;
    const userTable = 'todoUsers';
  
        const params = {
            KeyConditionExpression: 'username = :user',
            ExpressionAttributeValues: {
                ':user': userName
            },
            TableName: userTable
        };
        return await dynamodb.query(params).promise().then(response => {
 return response;
}, error =>{
    console.log('There is an error getting tasks: ', error);
});
        
    

}
module.exports.getTask = getTask;
