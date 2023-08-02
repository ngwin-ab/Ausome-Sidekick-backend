const express = require('express');
const router = express.Router();
const { Kid } = require('../models/Kid');
const { Chart } = require('../models/Chart');

// =================== CREATE ========================

router.post('/', (req, res) => {
    const kid = new Kid({
        name: req.body.name,
        imgPath: req.body.imgPath,
    });

    kid.save().then((createdKid => {
        res.status(201).json(createdKid)
    })).catch((err) => {
        res.status(400).json({
            error: err,
            success: false
        })
    })
})

// add a new chart for a specific kid 
router.post("/:id", (req, res) => {
    // Create a new chart 
    const chart = new Chart({
        timestamp: req.body.timestamp,
        setting: req.body.setting,
        antecedent: req.body.antecedent,
        behavior: req.body.behavior,
        consequence: req.body.consequence,
        kid_id: req.params.id
    });

    chart.save().then(createdChart => {
        res.status(201).json(createdChart)
    }).catch((err) => {
        res.json(err);
    });
});

// =================== READ ========================

router.get('/', async (req, res) => {
    const kidList = await Kid.find().select("-__v");

    if (!kidList) {
        res.status(404).json({
            success: false
        })
    }

    res.send(kidList);
})

router.get('/:id', async (req, res) => {
    const kid = await Kid.findById(req.params.id, {_id :0, __v:0}).populate({ path: 'chartsRecorded', select: 'timestamp setting antecedent behavior consequence' });

    if (!kid) {
        res.status(404).json({ success: false, message: "Kid not found!" })
    }

    res.status(200).send(kid)
})

// =================== UPDATE ========================

router.put('/:id', async (req, res) => {
    Kid.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        imgPath: req.body.imgPath
    }, { new: true }).then(kid => {
        if (kid) {
            return res.status(200).send(kid)
        } else { return res.status(404).json({ success: false, message: "Kid not found!" }) }
    }).catch(err => (err => {
        return res.status(400).json({ success: false, error: err })
    }))
})

//  =================== DELETE ========================

router.delete('/:id', (req, res) => {
    Kid.findByIdAndRemove(req.params.id).then(kid => {
        if (kid) {
            return res.status(200).json({ success: true, message: "The kid has been successfully deleted!" })
        } else { return res.status(404).json({ success: false, message: "Kid not found!" }) }
    }).catch(err => (err => {
        return res.status(400).json({ success: false, error: err })
    }))
})

module.exports = router;