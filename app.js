const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'));

dotenv.config();

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

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})