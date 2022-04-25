const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';
const getT = require('./getTasks');
//function to add task to the to do list
async function addtodo(event){const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';
const getT = require('./getTasks');

async function addtodo(event){
    const userName = event.username;
    const tName = event.tName;
    const tTxt = event.tTxt;
    if(!tName || !tTxt)
    {
         return util.buildResponse(401,{
            message: 'You are missing one or more required feilds'
        })
    }
      const tsk = {
      username: userName,
      tName: tName,
      tTxt: tTxt
  }  
  
   const saveTaskResponse = await saveTask(tsk);
   if(!saveTaskResponse){
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
        })
   }
    return util.buildResponse(200, {
        tName: tName
   });
    

 async function saveTask (tsk){
    const params = {
            TableName: userTable,
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

module.exports.addtodo = addtodo;