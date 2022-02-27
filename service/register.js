const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'AppUsers';
const bcrypt = require('bcryptjs');

async function register(userInfo){
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;
    if (!name || !username || !email || !password){
        return util.buildResponse(401,{
            message: 'You are missing one or more required feilds'
        } )
    }
    const dUser = await getUser(username.toLowerCase().trim());
    if(dUser && dUser.username){
        return util.buildResponse(401,{
            message: 'Username is already being used, choose a different username'
        })
    }
    const encryptedPassword = bcrypt.hashSync(password.trim(0), 10);
    const user = {
        name: name,
        email: email,
        username: username.toLowerCase().trim(),
        password: encryptedPassword

    }
    const saveUserResponse = await saveUser(user);
    if(!saveUserResponse){
        return util.buildResponse(503,{
            message: 'Server Error, Please try again later'
        })
    }
    return util.buildResponse(200, {
        username: username
    });
}

async function getUser(username){
const params = {
    TableName: userTable,
    Key: {
        username: username
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
        Item: user
    }
    return await dynamodb.put(params).promise().then(() =>{
        return true;
    }, error =>{
        console.error('There is an error saving user', error);
    });
}
module.exports.register= register;