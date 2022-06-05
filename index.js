const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql");
const mongoose = require("mongoose");
const gameRoutes = require('./routes/MongoGame');
require("dotenv").config();

const PORT = process.env.PORT || 3001;
//usamos una constante para el puerto de conexion en caso de que este en modo de produccion (Heroku)y obtenga el puerto del mismo servidor 
//o en caso de que este en modo de desarrollo usamos nuestro propio puerto (nodemon

//Middleware
app.use('/mongo', gameRoutes)

const db = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    user:  "ba1c8e83e0cefe",
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
mongoose.connect(process.env.MONGODB).then(() =>{
    console.log("Conectado a mongo Atlas");
}).catch((err) => {
    console.error(err);
})


app.get("/hello", (req, res) => {
    res.send('Hello World in express');
})

app.get("/mysql/count/year", (req, res) =>{
    const sql = "select * FROM getCountGamesGroupByYear";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})


app.get("/mysql/count/platform", (req, res) =>{
    const sql = "select * FROM getGamesByPlatform";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/mysql/count/metascore", (req, res) =>{
    const sql = "SELECT * FROM getgamesbyscore";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/mysql/count/userscore", (req, res) =>{
    const sql = "SELECT * FROM getgamesbyscoreuser";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/mysql/worst", (req, res) =>{
    const sql = "SELECT * FROM get10worstgamesbymetascore";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/mysql/best", (req, res) =>{
    const sql = "SELECT * FROM get10bestgamesbymetascore";
    db.query(sql, (err,result) =>{
        res.send(result);
    })
})

app.get("/mysql/best/platform/:platform", (req, res) =>{
    let { platform } = req.params;
    platform = getPlatform(platform);

    const sql = `CALL get10bestgamesbymetascoreandplatform('${platform}')`;
    db.query(sql, (err,result) =>{
        res.send(result[0]);
    })
})

app.get("/mysql/worst/platform/:platform", (req, res) =>{
    let { platform } = req.params;
    platform = getPlatform(platform);

    const sql = `CALL get10worstgamesbymetascoreandplatform('${platform}')`;
    db.query(sql, (err,result) =>{
        res.send(result[0]);
    })
})

app.get("/mysql/best/year/:year", (req, res) =>{
    let { year } = req.params;

    const sql = `CALL get10bestgamesbymetascoreandyear('${year}')`;
    db.query(sql, (err,result) =>{
        res.send(result[0]);
    })
})

app.get("/mysql/worst/year/:year", (req, res) =>{
    let { year } = req.params;

    const sql = `CALL get10worstgamesbymetascoreandyear('${year}')`;
    db.query(sql, (err,result) =>{
        res.send(result[0]);
    })
})

app.listen(PORT, () => {
    console.log('Corriendo 3001');
});

function getPlatform(platform) {
    switch (platform) {
      case "playstation4":
        return "PlayStation 4";
      case "stadia":
        return "Stadia";
      case "nintendo64":
        return "Nintendo 64";
      case "playstation5":
        return "PlayStation 5";
      case "dreamcast":
        return "Dreamcast";
      case "wiiu":
        return "Wii U";
      case "playstationvita":
        return "PlayStation Vita";
      case "playstation":
        return "PlayStation";
      case "3ds":
        return "3DS";
      case "gameboy":
        return "Game Boy Advance";
      case "psp":
        return "PSP";
      case "wii":
        return "Wii";
      case "gamecube":
        return "GameCube";
      case "ds":
        return "DS";
      case "xbox":
        return "Xbox";
      case "playstation2":
        return "PlayStation 2";
      case "xboxone":
        return "Xbox One";
      case "playstation3":
        return "PlayStation 3";
      case "switch":
        return "Switch";
      case "xbox360":
        return "Xbox 360";
      case "pc":
        return "PC";
    }
  }