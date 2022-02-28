
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const auth = require('../utils/auth');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoLogin';
const bcryptjs = require('bcryptjs');

//Check Username and password against what exists in the db.
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
    //compares the pw entered to hash/salted pw in db
   if (!bcryptjs.compareSync(userPassword, dUser.Password))return util.buildResponse(401,{
    message: 'Invalid password'
})
 const userInfo = {
     username: dUser.username,
     name: dUser.name
 }
 //genterates token using the auth file
 const token = auth.generateToken(userInfo);
        const response = {
            user: userInfo,
            token: token
        }
        return util.buildResponse(200, response);
}
   
  //gets user login information from the sb
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
