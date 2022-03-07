const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';


async function getTask(){
    
    const getResponse = await getTasks();
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
async function getTasks(){
    const userName = 'jared';
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
    console.log('There is an error getting task: ', error);
});
        
    

}
module.exports.getTask = getTask;
