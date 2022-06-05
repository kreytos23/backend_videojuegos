const express = require("express");
const gameSchema = require("../models/game");

const router = express.Router();

//Query de control
router.get("/get", (req, res) => {
  gameSchema
    .find()
    .then((data) => res.json(data[0]))
    .catch((err) => res.json({ message: err }));
});

//Query de control
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

router.get("/count/platform", (req, res) => {
  let result = [];

  platforms.map((item) => {
    let filter = {
      platform: {
        $eq: item,
      },
    };
    result.push(gameSchema.find(filter).count());
  });

  Promise.all(result).then((data) => {
    let countDate = [];
    let aux2 = 0;
    data.map((item) => {
      let aux = {
        Platform: platforms[aux2],
        Cuantity: item,
      };
      countDate.push(aux);
      aux2++;
    });
    res.json(countDate);
  });
});

router.get("/count/year", (req, res) => {
  let result = [];

  dates.map((item) => {
    let filter = {
      year: {
        $eq: item,
      },
    };
    result.push(gameSchema.find(filter).count());
  });

  Promise.all(result).then((data) => {
    let countDate = [];
    let aux2 = 0;
    data.map((item) => {
      let aux = {
        Date: dates[aux2],
        Cuantity: item,
      };
      countDate.push(aux);
      aux2++;
    });
    res.json(countDate);
  });
});

router.get("/count/metascore", (req, res) => {
  let result = [];

  for (let index = 99; index >= 20; index--) {
    let filter = {
      meta_score: {
        $eq: index,
      },
    };
    result.push(gameSchema.find(filter).count());
  }

  Promise.all(result).then((data) => {
    let countDate = [];
    let aux2 = 99;
    data.map((item) => {
      let aux = {
        meta_score: aux2,
        Cuantity: item,
      };
      countDate.push(aux);
      aux2--;
    });
    res.json(countDate);
  });
});

router.get("/count/userscore", (req, res) => {
  let result = [];

  score.map((item) => {
    let filter = {
      user_review: {
        $eq: item,
      },
    };
    result.push(gameSchema.find(filter).count());
  });

  Promise.all(result).then((data) => {
    let countDate = [];
    let aux2 = 0;
    data.map((item) => {
      let aux = {
        user_review: score[aux2],
        Cuantity: item,
      };
      countDate.push(aux);
      aux2++;
    });
    res.json(countDate);
  });
});

router.get("/worst", (req, res) => {
  gameSchema
    .find().sort({meta_score: 1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/best", (req, res) => {
  gameSchema
    .find().sort({meta_score: -1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/best/platform/:platform", (req, res) => {
  let { platform } = req.params;
    platform = getPlatform(platform);

  let filter = {
    platform: platform
  }

  gameSchema
    .find(filter).sort({meta_score: -1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/worst/platform/:platform", (req, res) => {
  let { platform } = req.params;
    platform = getPlatform(platform);

  let filter = {
    platform: platform
  }

  gameSchema
    .find(filter).sort({meta_score: 1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/best/year/:year", (req, res) => {
  let { year } = req.params;

  let filter = {
    year: year
  }

  gameSchema
    .find(filter).sort({meta_score: -1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.get("/worst/year/:year", (req, res) => {
  let { year } = req.params;

  let filter = {
    year: year
  }

  gameSchema
    .find(filter).sort({meta_score: 1}).limit(10)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
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
  2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
  2020, 2021,
];

let platforms = [
  " PlayStation 4",
  " Stadia",
  " Nintendo 64",
  " PlayStation 5",
  " Dreamcast",
  " Wii U",
  " PlayStation Vita",
  " PlayStation",
  " 3DS",
  " Game Boy Advance",
  " PSP",
  " Wii",
  " GameCube",
  " DS",
  " Xbox",
  " PlayStation 2",
  " Xbox One",
  " PlayStation 3",
  " Switch",
  " Xbox 360",
  " PC",
];

let score = [
  "tbd",
  "9.7",
  "9.6",
  "9.4",
  "9.3",
  "9.2",
  "9.1",
  "9",
  "8.9",
  "8.8",
  "8.7",
  "8.6",
  "8.5",
  "8.4",
  "8.3",
  "8.2",
  "8.1",
  "8",
  "7.9",
  "7.8",
  "7.7",
  "7.6",
  "7.5",
  "7.4",
  "7.3",
  "7.2",
  "7.1",
  "7",
  "6.9",
  "6.8",
  "6.7",
  "6.6",
  "6.5",
  "6.4",
  "6.3",
  "6.2",
  "6.1",
  "6",
  "5.9",
  "5.8",
  "5.7",
  "5.6",
  "5.5",
  "5.4",
  "5.3",
  "5.2",
  "5.1",
  "5",
  "4.9",
  "4.8",
  "4.7",
  "4.6",
  "4.5",
  "4.4",
  "4.3",
  "4.2",
  "4.1",
  "4",
  "3.9",
  "3.8",
  "3.7",
  "3.6",
  "3.5",
  "3.4",
  "3.3",
  "3.2",
  "3.1",
  "3",
  "2.9",
  "2.8",
  "2.7",
  "2.6",
  "2.5",
  "2.4",
  "2.3",
  "2.2",
  "2.1",
  "2",
  "1.9",
  "1.8",
  "1.7",
  "1.6",
  "1.5",
  "1.4",
  "1.3",
  "1.2",
  "1.1",
  "1",
  "0.9",
  "0.8",
  "0.7",
  "0.6",
  "0.5",
  "0.2",
];

module.exports = router;
