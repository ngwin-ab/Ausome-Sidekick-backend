const express = require('express');
const router = express.Router(); 
const {Kid} = require('../models/Kid');

// =================== GET ALL KIDS ========================
router.get('/', async (req, res) => {
    const kidList = await Kid.find();

    if(!kidList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(kidList);
})

// =================== POST NEW KID ========================
router.post('/', (req, res) => {
    const kid = new Kid ({
        name: req.body.name,
        imgPath: req.body.imgPath,
    })

    kid.save().then((createdKid=> {
        res.status(201).json(createdKid)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;

// =================== UPDATE A KID ========================