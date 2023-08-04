const express = require('express');

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');


const userRoutes =require('./routes/user');
const expenseRoutes= require('./routes/expense')

app.use(cors())

app.use(bodyParser.json());

app.use('/',userRoutes)
app.use('/user',userRoutes)
app.use('/',expenseRoutes);

app.listen(3000);