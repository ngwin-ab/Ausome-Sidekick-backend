const express = require('express');
const router = express.Router(); 
const {Chart} = require('../models/Chart');

// =================== GET ALL CHARTS ========================
router.get('/', async (req, res) => {
    const chartList = await Chart.find();

    if(!chartList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(chartList);
})

// =================== POST NEW CHART ========================
router.post('/', (req, res) => {
    const chart = new Chart ({
        date: req.body.date,
        setting: req.body.setting,
        antecedent: req.body.antecedent,
        behavior: req.body.behavior,
        consequence: req.body.consequence
    })

    chart.save().then((createdChart=> {
        res.status(201).json(createdChart)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;