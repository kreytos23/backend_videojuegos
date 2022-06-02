const express = require("express");
const gameSchema = require("../models/game");

const router = express.Router();

router.get("/get", (req, res) => {
  gameSchema
    .find()
    .then((data) => res.json(data[0]))
    .catch((err) => res.json({ message: err }));
});

router.get("/get/:platform", (req, res) => {
  let { platform } = req.params;
  platform = getPlatform(platform);
  const filter = {
    platform: platform,
  };
  gameSchema
    .find(filter)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/get/count/:platform", (req, res) => {
  let { platform } = req.params;
  platform = getPlatform(platform);
  const filter = {
    platform: platform,
  };
  gameSchema
    .find(filter)
    .count()
    .then((data) =>
      res.json({
        name: platform,
        cuantity: data,
      })
    )
    .catch((err) => res.json({ message: err }));
});

router.get("/get/date/count", (req, res) => {

  let result = [];
  
  dates.map((item) => {
    let filter = {
        year: {
          $eq: item,
        },
      };
    result.push(gameSchema
      .find(filter)
      .count())
      
  });
  Promise.all(result).then((data) => {
    let countDate = [];
    let aux2 = 0;
    data.map((item) => {
        let aux = {
            "Date": dates[aux2],
            "Cuantity": item
        }
        countDate.push(aux);
        aux2++;
    })
    res.json(countDate);
  })
  
});

function getPlatform(platform) {
  switch (platform) {
    case "playstation4":
      return " PlayStation 4";
    case "stadia":
      return " Stadia";
    case "nintendo64":
      return " Nintendo 64";
    case "playstation5":
      return " PlayStation 5";
    case "dreamcast":
      return " Dreamcast";
    case "wiiu":
      return " Wii U";
    case "playstationvita":
      return " PlayStation Vita";
    case "playstation":
      return " PlayStation";
    case "3ds":
      return " 3DS";
    case "gameboy":
      return " Game Boy Advance";
    case "psp":
      return " PSP";
    case "wii":
      return " Wii";
    case "gamecube":
      return " GameCube";
    case "ds":
      return " DS";
    case "xbox":
      return " Xbox";
    case "playstation2":
      return " PlayStation 2";
    case "xboxone":
      return " Xbox One";
    case "playstation3":
      return " PlayStation 3";
    case "switch":
      return " Switch";
    case "xbox360":
      return " Xbox 360";
    case "pc":
      return " PC";
  }
}

let dates = [
  1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  2021
];

module.exports = router;
