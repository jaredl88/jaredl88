
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoLogin';
const bcryptjs = require('bcryptjs');

async function register(event){
    const userName = event.username;
    const userEmail = event.email;
    const userPassword = event.password;
    const name = event.name;
  //Checks to make sure all fields have been entered
    if(!userName || !userEmail || !userPassword || !name)
    {
         return util.buildResponse(401,{
            message: 'You are missing one or more required feilds'
        })

    }
  //checks db to make sure the user name does not already exist
    const dUser = await getUser(userName.toLowerCase().trim());
    if(dUser && dUser.username){
        return util.buildResponse(401,{
            message: 'Username is already being used, choose a different username'
        })
    }
    //hashes and salts password to make it unreadable inside the db pws that are the same will also have different hash values
    const saltRounds = 10;
    const hashpassword = await bcryptjs.hash(userPassword, saltRounds);
    
      const user = {
      name: name,
      username: userName,
      useremail: userEmail,
      password: hashpassword
  }  
  //Checks to see if the save function is successful
   const saveTaskResponse = await saveUser(user);
   if(!saveTaskResponse){
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
//Save registration information in the database
 async function saveUser(user){
 
   
    const params = {
            TableName: userTable,
            Key: {
                "username": user.username
            },
            UpdateExpression: "SET #Name = :valN, #UserName = :val, #UserEmail = :valE, #UserPassword = :valP",
            ExpressionAttributeNames: {
                "#Name": "Name",
                "#UserName": "Username",
                "#UserEmail": "Email",
                "#UserPassword": "Password"
            },
            ExpressionAttributeValues: {
                ":valN": user.name,
                ":val": user.username,
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

 
}

module.exports.register = register;
