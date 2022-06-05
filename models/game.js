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
    year:{
        type: Number,
        required: true
    },
    month:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    meta_score:{
        type: Number,
        required: true
    },
    user_review:{
        type: String,
        required: true
    },
});

//En name va el nombre dela coleccion de la base de datos
module.exports = mongoose.model('videogames', gameSchema);