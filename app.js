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
let user

async function main() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { useNewUrlParser: true, bufferCommands: false });
     User.find({}, (err, data) => {
      console.log(data);
      user = data
    });
  } catch (e) {
    console.log(e);
  }
}
main();

app.get('/', async (req, res) => {
await res.json(user)
})

const PORT = process.env.PORT || 8003
app.listen(PORT, () => console.log(`server listen to port ${PORT} ...`))
