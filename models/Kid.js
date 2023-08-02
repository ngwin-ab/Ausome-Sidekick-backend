const mongoose = require('mongoose');

const KidSchema = mongoose.Schema({
    name: { type: String, required: true },
    imgPath: { type: String, required: true }
});

KidSchema.virtual('chartsRecorded', {
    ref: 'Chart',
    localField: '_id',
    foreignField: 'kid_id'
});

KidSchema.set('toObject', { virtuals: true });
KidSchema.set('toJSON', { virtuals: true });

exports.Kid = mongoose.model('Kid', KidSchema);