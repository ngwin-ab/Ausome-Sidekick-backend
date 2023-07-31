const mongoose = require('mongoose');
// const Chart = require('../models/Chart');

const KidSchema = mongoose.Schema({
    name: {type: String, required: true},
    avtUrl: {type: String, required: true},
    // charts: [Chart]
});

module.exports = mongoose.model('Kid', KidSchema);