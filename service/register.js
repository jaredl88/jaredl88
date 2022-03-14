
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoLogin';
const taskTable = 'todoUsers';
const completedTable ='todoCompleted';
const bcryptjs = require('bcryptjs');

async function register(event){
    const userName = event.username;
    const userEmail = event.email;
    const userPassword = event.password;
    const name = event.name;

    if(!userName || !userEmail || !userPassword || !name)
    {
         return util.buildResponse(401,{
            message: 'You are missing one or more required feilds'
        })

    }
    const dUser = await getUser(userName.toLowerCase().trim());
    if(dUser && dUser.username){
        return util.buildResponse(401,{
            message: 'Username is already being used, choose a different username'
        })
    }
    const saltRounds = 10;
    const hashpassword = await bcryptjs.hash(userPassword, saltRounds);
    
      const user = {
      name: name,
      username: userName,
      useremail: userEmail,
      password: hashpassword
  }  
 
   const saveTaskResponse = await saveUser(user);
   const saveTaskKeyResponse = await addTaskKey(user);
   const saveCompletedResponse = await addCompletedKey(user);
   if(!saveTaskResponse || !saveTaskKeyResponse || !saveCompletedResponse){
        return util.buildResponse(503,{
           message: 'Server Error, Please try again later'
        })
   }
    return util.buildResponse(200, {
        userName
   });
   
   async function getUser(userName){
    const params = {
        TableName: userTable,
        Key: {
            "username": userName
        }  
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error =>{
        console.log('There is an error getting user: ', error);
    })
    }

 async function saveUser(user){
 
   
    const params = {
            TableName: userTable,
            Key: {
                "username": user.username
            },
            UpdateExpression: "SET #Name = :valN, #UserEmail = :valE, #UserPassword = :valP",
            ExpressionAttributeNames: {
                "#Name": "Name",
                "#UserEmail": "Email",
                "#UserPassword": "Password"
            },
            ExpressionAttributeValues: {
                ":valN": user.name,
                ":valE": user.useremail,
                ":valP": user.password
            }
        };
    return await dynamodb.update(params).promise().then(response => {
 return true;
}, error =>{
    console.log('There is an error getting task: ', error);
});
 
 }
 async function addTaskKey(user) {
       const params = {
            TableName: taskTable,
            Key: {
                "username": user.username
            }
        };
    return await dynamodb.update(params).promise().then(response => {
 return true;
}, error =>{
    console.log('There is an error getting task: ', error);
});
     
 }

 async function addCompletedKey(user) {
       const params = {
            TableName: completedTable,
            Key: {
                "username": user.username
            },
        };
    return await dynamodb.update(params).promise().then(response => {
 return true;
}, error =>{
    console.log('There is an error getting task: ', error);
});
     
 }
}

module.exports.register = register;
