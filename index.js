const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3040;
// const ROUTES_HOME = require("./server/router/router.js");
const mongoose = require('mongoose');
const config = require('./server/config/key.js');
const cookieParser = require("cookie-parser");
//const cors = require('cors');

app.use(express.json());
//app.use(cors());
app.use(cookieParser());
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
//=================== 이 밑으로 미들웨어 설정 하지 않기, route 설정 전에 설정해야 하는 듯 하다=============
app.set("views", "./client/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));

// api/users 경로로 들어오는 요청을 ./server/router/UserRouter.js 경로로 다 처리하겠다
app.use('/api/users', require("./server/router/UserRouter.js"))
//app.use('/api/product', require('./server/router/ProductRouter.js'))
//app.use("/", ROUTES_HOME);





module.exports = {
  app,
  PORT
}