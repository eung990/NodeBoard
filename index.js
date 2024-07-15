const express = require("express");

const app = express();

const session = require("express-session");

const PORT = 3040;

const ROUTES_HOME = require("./components/router/router.js");

const mongoose = require('mongoose');

const config = require('./components/config/key.js');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));



mongoose.connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected....")
  })
  .catch((err) => {
    console.log(err)
  })


//앱 세팅
app.set("views", "./components/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

app.use("/", ROUTES_HOME);

module.exports = {
  app,
  PORT
}