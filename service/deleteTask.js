const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';
const userName = 'jared';

async function deleteTask(event){
    const tName = event.tName;
    const userName = 'jared';
    const tsk = {
        username: userName,
        tName: tName
    };
const deleteTaskResponse = await deleteT(tsk);
    if(!deleteTaskResponse){
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
        })
   }
    return util.buildResponse(200, {
    tName
   });



async function deleteT(tsk){
    const taskName = tsk.tName; 
    const userName = tsk.userName;
    var params = {
        TableName: userTable,
        Key: {
            "username": tsk.username,
        },
        UpdateExpression: "REMOVE #taskName",
        ExpressionAttributeNames: {
          "#taskName": taskName  
        },
        ReturnValues: "ALL_OLD"
    };
    return await dynamodb.update(params).promise().then(response => {
        return tsk.tName;
       }, error =>{
           console.log('There is an error getting task: ', error);
       });

}
}
module.exports.deleteTask = deleteTask;
