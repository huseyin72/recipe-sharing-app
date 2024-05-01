const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//db
const sequelize = require('./utils/db');
// confing env
const path = './config.env'
require('dotenv').config({path:path});


// initialize app
const app = express();


//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//cookie parser
app.use(cookieParser());
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_DIALECT:', process.env.DB_DIALECT);
console.log('DB_LOGGING:', process.env.DB_LOGGING);



//ROUTES
const recipeRouter = require('./routes/recipeRouter');
app.use('/recipe-service/api',recipeRouter);


//db test



//404 not found
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})


// connect to port
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(process.env.PORT);
        console.log(process.env.PORT)
    })
    .catch(err => console.log(err,'error handle'));
