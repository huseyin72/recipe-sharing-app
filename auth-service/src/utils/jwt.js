var jwt = require('jsonwebtoken');
const path = "./config.env"
require('dotenv').config({path:path});
console.log(process.env.DB_NAME)

class JWT{
    generateToken(user){ 
        const payload = {email : user.email};
        return jwt.sign(payload,'recipeAppNow3355',{expiresIn:"12h"})
    };
    verifyToken(token){
        return jwt.verify(token,'recipeAppNow3355');
    };
}

module.exports = JWT;