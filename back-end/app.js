const express = require('express');

const app = express();
const cors = require('cors')

app.use(cors())


const bodyParser = require('body-parser');


const userRoutes =require('./routes/user');

app.use(bodyParser.json());

app.use('/user',userRoutes)

app.listen(3000);