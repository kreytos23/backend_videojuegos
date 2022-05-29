const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const mongoose = require("mongoose");
const gameRoutes = require('./routes/game');

require("dotenv").config;


const PORT = process.env.PORT || 3001;
//usamos una constante para el puerto de conexion en caso de que este en modo de produccion (Heroku)y obtenga el puerto del mismo servidor 
//o en caso de que este en modo de desarrollo usamos nuestro propio puerto (nodemon)


//Middleware
app.use('/mongo', gameRoutes)

const db = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user: "ba1c8e83e0cefe",
    password: "b83b77e8",
    database: "heroku_e2d6adb49bc0a8d"
})


app.use(cors({
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//Mongoose init
mongoose.connect("mongodb+srv://kreytos2001:cesar2001@bddistribuidas.7vkos.mongodb.net/videogames?retryWrites=true&w=majority").then(() =>{
    console.log("Conectado a mongo Atlas");
}).catch((err) => {
    console.error(err);
})


app.get("/hello", (req, res) => {
    res.send('Hello World in express');
})

app.get("/getgame", (req, res) =>{
    const sql = "select * FROM getCountGamesGroupByYear";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/getgame/platform", (req, res) =>{
    const sql = "select * FROM getGamesByPlatform";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.listen(PORT, () => {
    console.log('Corriendo 3001');
});