const express = require("express");
const db = require("../connections/MySQLPool");
const router = express.Router();
const cors = require("cors");

router.get("/hello", (req, res) => {
  res.send("Hello World in express");
});

router.get("/count/year",cors(), (req, res) => {
  const sql = "select * FROM getCountGamesGroupByYear";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/count/platform",cors(), (req, res) => {
  const sql = "select * FROM getGamesByPlatform";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/count/metascore",cors(), (req, res) => {
  const sql = "SELECT * FROM getgamesbyscore";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/count/userscore",cors(), (req, res) => {
  const sql = "SELECT * FROM getgamesbyscoreuser";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/worst",cors(), (req, res) => {
  const sql = "SELECT * FROM get10worstgamesbymetascore";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/best",cors(), (req, res) => {
  const sql = "SELECT * FROM get10bestgamesbymetascore";
  db.query(sql, (err, result) => {
    res.send(result);
  });
});

router.get("/best/platform/:platform",cors(), (req, res) => {
  let { platform } = req.params;
  platform = getPlatform(platform);

  const sql = `CALL get10bestgamesbymetascoreandplatform('${platform}')`;
  db.query(sql, (err, result) => {
    res.send(result[0]);
  });
});

router.get("/worst/platform/:platform",cors(), (req, res) => {
  let { platform } = req.params;
  platform = getPlatform(platform);

  const sql = `CALL get10worstgamesbymetascoreandplatform('${platform}')`;
  db.query(sql, (err, result) => {
    res.send(result[0]);
  });
});

router.get("/best/year/:year",cors(), (req, res) => {
  let { year } = req.params;

  const sql = `CALL get10bestgamesbymetascoreandyear('${year}')`;
  db.query(sql, (err, result) => {
    res.send(result[0]);
  });
});

router.get("/worst/year/:year",cors(), (req, res) => {
  let { year } = req.params;

  const sql = `CALL get10worstgamesbymetascoreandyear('${year}')`;
  db.query(sql, (err, result) => {
    res.send(result[0]);
  });
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

module.exports = router;
