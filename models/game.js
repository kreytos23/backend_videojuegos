const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        required: true
    },
    release_date:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    meta_score:{
        type: String,
        required: true
    },
    user_review:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('videogames', gameSchema);