const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const kidsRoute=require('./routes/kidsRoute');
const chartsRoute = require('./routes/chartsRoute');

const port = 3000;

const app = express();

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routes
app.use('/kids', kidsRoute);
app.use('/charts', chartsRoute);


//connect app with mongo database through connection string in .env file
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database connected')
})
.catch((err)=>{
    console.log(err)
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})