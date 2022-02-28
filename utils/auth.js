const jwt = require('jsonwebtoken');

function generateToken(userInfo){
    if(!userInfo) {
        return null;
}
    //returns token with 1h expiration for the userInformation and the env variable
    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

function verifyToken(username, token){
    //verifies token 
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if(error) {
            return {
                verified: false, message: 'invalid token'
            }
        }
        //makes sure user name is equal to the one in the response
        if(response.username !== username) {
            return {
                verified: false, message: 'invalid username'
            }
        }
        //If verified returns true
        return {
            verified: true,
            message: 'verified'
        }
    })

}
module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
