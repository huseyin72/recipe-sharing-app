const User = require('../models/User');
const JWT = require('../utils/jwt');
const jwt = new JWT();
const bcrypt = require('bcrypt');

//REGISTER
exports.register = async(req,res) =>{ 
    try {
        const {email,password} = req.body;
        console.log(email, password);
        const newUser = await User.create({email:email,password:password});
        res.status(200).json({ 
            status:'success', 
            newUser:newUser
        });
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error:error

        });
    }
};


//LOGIN
exports.login = async (req,res) =>{ 
    try {
        const {email,password} = req.body;
        //check user 
        const user = await User.findOne({where:{email:email}});
        if(!user){ 
           throw new Error('User Not Found');
        };
        //check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Email or Password is wrong');
        }

        //generate token
        const token = await jwt.generateToken(user);

        // set cookie
        res.cookie('token',token,{httpOnly:true,secure:true});
        res.status(200).json({
            status:'success',
            loggedUser:user,
            token:token,

        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:'fail',
            error:error

        });
    }
}


//LOGOUT
exports.logout = async(req,res) =>{
    try {
    
        //inaktif token
        res.cookie('token', '', { httpOnly: true, maxAge: 0 });
        res.status(200).json({
            status:'success',
            message:"logout successfull"
        })
        
    } catch (error) {
        res.status(400).json({
            error:error
        });
    }
}