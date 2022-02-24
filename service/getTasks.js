const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'

})
const util = require('../utils/util');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'todoUsers';


async function getTask(){
    const userName = 'jared';
    const userTable = 'todoUsers';

   const params = {
    Key:{
        "username": userName
    },
    TableName: userTable,
    ConsistentRead: true,
};
 return await dynamodb.update(params).promise().then(response => {
 return response;
}, error =>{
    console.log('There is an error getting task: ', error);
});

    

}


module.exports.getTask = getTask;