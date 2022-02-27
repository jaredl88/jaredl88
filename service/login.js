
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const auth = require('../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoLogin';
const bcryptjs = require('bcryptjs');


async function login(user){
    const userName = user.username;
    const userPassword = user.password;

    if(!userName || !user|| !userPassword) return util.buildResponse(401,{
            message: 'You are missing one or more required feilds'
        })
    

    const dUser = await getUser(userName.toLowerCase().trim());
    if(!dUser || dUser.userName) return util.buildResponse(401,{
           message: 'User does not exist, Please enter a valid username'
       });

   if (!bcryptjs.compare(userPassword, dUser.Password))return util.buildResponse(401,{
    message: 'Invalid password'
})
 const userInfo = {
     username: dUser.username,
     name: dUser.name
 }
 const token = auth.generateToken(userInfo);
        const response = {
            user: userInfo,
            token: token
        }
        return util.buildResponse(200, response);
}
   
  
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

    
    async function currentUser(getUser, userName)
    {
        return getUser(userName);
    }
  

 


module.exports.login = login;
module.exports.currentUser = currentUser;