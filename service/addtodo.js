const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';
const getT = require('./getTasks');
//function to add task to the to do list
async function addtodo(event){
    const userName = 'jared1';
    const tName = event.tName;
    const tTxt = event.tTxt;
  //If user input is not present error
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
  //makes sure the task is saved to the db if not error
   const saveTaskResponse = await saveTask(tsk);
   if(!saveTaskResponse){
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
        })
   }
    return util.buildResponse(200, {
        tName: tName
   });
    
//Takes params and updates dynamodb to reflect the change taskName and taskText
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
      //returns task name if successful error if fail
 return tsk.tName;
}, error =>{
    console.log('There is an error getting task: ', error);
});
    
 }

 
}

module.exports.addtodo = addtodo;
