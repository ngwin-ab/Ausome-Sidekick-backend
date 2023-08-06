const express = require('express');
const router = express.Router();
const {Chart} = require('../models/Chart');

// const timestamp = moment(date).format('MM-DD-YYYY');

// =================== CREATE ========================

router.post('/', async (req, res) => {
    let chart = new Chart({
        // timestamp: req.body.timestamp,
        setting: req.body.setting,
        antecedent: req.body.antecedent,
        behavior: req.body.behavior,
        consequence: req.body.consequence
    })

    chart = await chart.save();

    if (!chart) {
        return res.status(400).send('The chart could not be created!')
    }

    res.send(chart);
})

// =================== READ ========================

router.get('/', async (req, res) => {
    const chartList = await Chart.find({}, '-__v');

    if (!chartList) {
        res.status(400).json({ success: false })
    }

    res.status(200).send(chartList);
})

router.get('/:id', async (req, res) => {
    const chart = await Chart.findById(req.params.id, '-__v');

    if (!chart) {
        res.status(404).json({ success: false, message: "Chart not found!" })
    }

    res.status(200).send(chart)
})

// =================== UPDATE  ========================

router.put('/:id', async (req, res) => {
    Chart.findByIdAndUpdate(req.params.id, {
                    timestamp: req.body.timestamp,
                    setting: req.body.setting,
                    antecedent: req.body.antecedent,
                    behavior: req.body.behavior,
                    consequence: req.body.consequence,
                }, { new: true} ).then(chart => {
        if (chart) {
            return res.status(200).send(chart)
        } else { return res.status(404).json({ success: false, message: "Chart not found!" }) }
    }).catch(err => (err => {
        return res.status(400).json({ success: false, error: err })
    }))
})
// router.put('/:id', async (res, req) => {
//     const chart = await Chart.findByIdAndUpdate(req.params.id,
//         {
//             timestamp: req.body.timestamp,
//             setting: req.body.setting,
//             antecedent: req.body.antecedent,
//             behavior: req.body.behavior,
//             consequence: req.body.consequence,
//         },
//         { new: true})

//     if (!chart) {
//         res.status(404).json({ success: false, message: "Chart not found!" })
//     }

//     res.status(200).send(chart)
// })

// =================== DELETE ========================

router.delete('/:id', (req, res) => {
    Chart.findByIdAndRemove(req.params.id).then(chart => {
        if (chart) {
            return res.status(200).json({ success: true, message: "The chart has been successfully deleted!" })
        } else { return res.status(404).json({ success: false, message: "Chart not found!" }) }
    }).catch(err => (err => {
        return res.status(400).json({ success: false, error: err })
    }))
})

module.exports = router;