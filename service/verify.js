const util = require('../utils/util');
const auth = require('../utils/auth');

function verify(requestBody){
    //Checks to make sure required info is present in the request body
    if(!requestBody.user || !requestBody.user.username || !requestBody.token) { return util.buildResponse(401, {
        verified: false,
        message: 'incorrect request body'
        
    })
    }
    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.username, token);
    //if information does not verify errors leaving verified as false
    if (!verification.verified) {
        return util.buildResponse(401, verification);
    }
    //If it verfys makes verified true and returns the user message and token and true value
    return util.buildResponse(200, {
        verified: true,
        message:'verified',
        user: user,
        token: token
    })
    }
    module.exports.verify = verify;
