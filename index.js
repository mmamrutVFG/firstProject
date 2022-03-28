console.log(process.env.NODE_ENV);


require('dotenv').config({path:`.env.${process.env.NODE_ENV}`});
console.log(process.env.PORT);
const express = require('express');
const cors = require('cors');

const indexRoute = require('./routes/index');
const sequelize = require('./util/database');
const app = express();

app.use(cors());
app.use('/', indexRoute);

try{
    sequelize.authenticate();
    console.log('DB Ok')
} catch(err){
    console.log('DB Fail, ', err);
}

sequelize.sync()
const port = process.env.PORT;

app.listen(port,()=>{console.log(`listening on port: ${port}`)});