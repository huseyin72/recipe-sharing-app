const express = require('express');
recipeRouter = express.Router();
recipeController = require('../controllers/recipeController');

recipeRouter
    .route('/add-recipe')
    .post(recipeController.addRecipe)

recipeRouter
    .route('/update-recipe/:id')
    .put(recipeController.updateRecipe)

recipeRouter
    .route('/delete-recipe/:id')
    .delete(recipeController.deleteRecipe)


module.exports = recipeRouter