const { DataTypes} = require('sequelize');
const sequelize = require('../utils/db');
const bcrypt = require('bcrypt');

const User = sequelize.define('User',{
    email:{
        primaryKey:true, 
        type:DataTypes.STRING,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        validate: {
            is:{
               args: /^(?=.*[a-zA-Z])(?=.*\d).{8,24}$/,
               msg:'Invalid format. It must contain at least 8 and at most 16 characters and contain at least one letter and one number.'
            } 
          }
    },



})
User.beforeCreate(async(user)=>{
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password,salt);

});


User.sync({})
module.exports = User;