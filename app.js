const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = 3000;

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));

app.get('/kids', (req, res) => {
    const kid = {
        id: 1,
        name: 'weee',
        image: 'some_url',
    }
    res.send(kid);
})

app.post('/kids', (req, res) => {
    const newKid = req.body;
    console.log(newKid)
    res.send(newKid);
})

//connecting app with mongo database through connection string in .env file
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