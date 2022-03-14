const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';
const completedTable = 'todoCompleted';

async function deleteTask(event){
    console.log(event.tName);
    const userName = event.username;
    const taskName = event.tName;
    const taskTxt = event.tTxt;
    const tsk = {
        username: userName,
        tName: taskName,
        tTxt: taskTxt
    };
const deleteTaskResponse = await deleteT(tsk);
const addCompletedResponse = await saveCompleted(tsk);
    if(!deleteTaskResponse || !addCompletedResponse){
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
        })
   }
    return util.buildResponse(200, {
    taskName
   });



async function deleteT(tsk){
    console.log(tsk.username);
    console.log(tsk.tName);
    var params = {
        TableName: userTable,
        Key: {
            "username": tsk.username,
        },
        UpdateExpression: "REMOVE #taskName",
        ExpressionAttributeNames: {
          "#taskName": tsk.tName  
        },
        ReturnValues: "ALL_OLD"
    };
    return await dynamodb.update(params).promise().then(response => {
        return tsk.tName;
       }, error =>{
           console.log('There is an error getting task: ', error);
       });

}
 async function saveCompleted(tsk){
    const params = {
            TableName: completedTable,
            Key: {
                "username": tsk.username,
            },
            UpdateExpression: "SET #TaskName = :val",
            ExpressionAttributeNames: {
                "#TaskName": tsk.tName,
            },
            ExpressionAttributeValues: {
                ":val": tsk.tTxt
            }
        };
    return await dynamodb.update(params).promise().then(response => {
 return tsk.tName;
}, error =>{
    console.log('There is an error getting task: ', error);
});
    
 }

}
module.exports.deleteTask = deleteTask;
