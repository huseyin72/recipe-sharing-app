const { DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

const Recipe = sequelize.define('Recipe',{
    recipeId:{
        type:DataTypes.INTEGER,
        primaryKey:true, 
        unique:true, 
        autoIncrement:true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userEmail: {
        type: DataTypes.STRING, // Store user ID as a regular field
        allowNull: false
      }
});

Recipe.sync({})
module.exports = Recipe;