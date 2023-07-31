const mongoose = require("mongoose");
import Chart from '../models/Chart'

const KidSchema = mongoose.Schema({
    name: {type: String, required: true},
    avtUrl: {type: String, required: true},
    charts: [Chart]
});

const Kid = mongoose.model('Kid', KidSchema);