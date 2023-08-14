const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const kidsRoute=require('./routes/kidsRoute');
const chartsRoute = require('./routes/chartsRoute');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routes
app.use('/kids', kidsRoute);
app.use('/charts', chartsRoute);


//connect app with mongo database through connection string in .env file
dotenv.config();
mongoose.connect(process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/ausome_db')
.then(()=>{
    console.log('Database connected')
})
.catch((err)=>{
    console.log(err)
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})