const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const gameRoutes = require("./routes/MongoGame");
const mysqlRoutes = require("./routes/MySQLGames");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

//Middleware
app.use("/mongo", gameRoutes);
app.use("/mysql", mysqlRoutes);

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Mongoose init
mongoose
  .connect("mongodb+srv://kreytos2001:cesar2001@bddistribuidas.7vkos.mongodb.net/videogames?retryWrites=true&w=majority")
  .then(() => {
    console.log("Conectado a mongo Atlas");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log("Corriendo 3001");
});
