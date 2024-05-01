const Recipe = require('../models/Recipe');

//add new recipe
exports.addRecipe = async(req,res) =>{
    try {
        const title = req.body.title || '';
        const description = req.body.description || '';
        const userEmail = req.body.userEmail || '';

        console.log(title,description); 
        const newRecipe = await Recipe.create({title:title,description:description,userEmail:userEmail});
        res.status(200).json({
            status:'success',
            recipe:newRecipe

        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            error:error
        });
    }
}

//update existing recipe by id
exports.updateRecipe = async(req,res) =>{
    try {
        const updatedData = {}
        if(req.body.title){
            updatedData.title = req.body.title;
        };
        if(req.body.description){
            updatedData.description = req.body.description;
        }
        const updatedRecipe = await Recipe.update(updatedData,{where:{recipeId:req.params.id}});
        res.status(200).json({
            status:'success',
            updatedRecipe:updatedRecipe,

        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            error:error
        });
    }

};


//delete recipe by id

exports.deleteRecipe = async(req,res) =>{
    try {
        const deletedRecipe = await Recipe.destroy({
            where:{
                recipeId:req.params.id
            }

        });
        res.status(200).json({
            status:'success',
            deletedRecipe:deletedRecipe,

        })
    } catch (error) {
        res.status(404).json({
            status:"fail",
            error:error
        });
    }
};