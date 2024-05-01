const JWT = require('../utils/jwt');
const jwt = new JWT();


const authenticate = async (req,res,next)=>{
    try {
        const token = req.cookies.token; // take token from cookies
        console.log(token);

        if(!token){ 
            throw new Error('Authentication token not found');
        }
        const decoded = await jwt.verifyToken(token)
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: 'false' });
    }
}

module.exports = {authenticate};