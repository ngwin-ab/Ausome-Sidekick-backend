const mongoose = require('mongoose');

const ChartSchema = mongoose.Schema({
    date: {type: Date, required: true},
    setting: {type: String, required: true},
    antecedent: {type: String, required: true},
    behavior: {type: String, required: true},
    consequence: {type: String, required: true},
});

const Chart = mongoose.model('Chart', ChartSchema);