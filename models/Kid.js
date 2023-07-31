const mongoose = require('mongoose');
const {Chart} = require('../models/Chart');

const KidSchema = mongoose.Schema({
    name: {type: String, required: true},
    imgPath: {type: String, required: true},
    charts: { type : Array , default : [] }
});

exports.Kid = mongoose.model('Kid', KidSchema);