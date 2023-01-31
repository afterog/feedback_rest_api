const express = require('express');
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()



let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(allowCrossDomain)



const uri = process.env.DATABASE;
const User = require('./model');

async function main() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { useNewUrlParser: true, bufferCommands: false });
}

app.get('/', async (req, res) => {
  try {
    main();
    User.find({}, (err, user) => {
      res.json(user)
    });
  } catch (e) {
    console.log(e);
  }
})

const PORT = process.env.PORT || 8003
app.listen(PORT, () => console.log(`server listen to port ${PORT} ...`))
