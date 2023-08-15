const mongoose = require('mongoose');
const moment = require('moment');

const ChartSchema = mongoose.Schema({
    // timestamp: { type: String, required: true },
    antecedent: { type: String, required: true },
    behavior: { type: String, required: true },
    consequence: { type: String, required: true },
    function: { type: String },
    kid_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kid',
        // required: true
    }
}, { id: true });

// const timestamp = moment(date).format('MM-DD-YYYY');

exports.Chart = mongoose.model('Chart', ChartSchema);