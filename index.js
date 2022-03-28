console.log(process.env.NODE_ENV);


require('dotenv').config({path:`.env.${process.env.NODE_ENV}`});


console.log(process.env.PORT);
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

const port = process.env.PORT;

app.listen(port,()=>{console.log(`listening on port: ${port}`)});