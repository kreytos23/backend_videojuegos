const express = require("express");
const gameSchema = require('../models/game');

const router = express.Router();

router.get('/get',(req, res) => {
    gameSchema.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
});

router.get('/get/:platform',(req, res) => {
    let { platform } = req.params
    if(platform == 'playstation4'){
        platform = ' PlayStation 4';
    }
    const filter = {
        platform: platform
    }
    gameSchema.find(filter)
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
});

module.exports = router;