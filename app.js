//  includes the required modules including express, mongoose, cors and dotenv.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// allowCrossDomain sets up CORS headers to allow cross-domain requests to the API.
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// et up express middleware including cors, parsing of JSON and URL-encoded requests, and the allowCrossDomain function.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(allowCrossDomain)

// URI variable is set to the value of the DATABASE environment variable which holds the connection string to the MongoDB database.
const uri = process.env.DATABASE;
// User model is imported from a separate file in the same directory.
const User = require('./model');

//  getDataIntoDb function retrieves data from the MongoDB database based on a passed user object.
async function getDataIntoDb(user) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { useNewUrlParser: true, bufferCommands: false });
    // 
    await User.find(user, (err, data) => {
      if (error) console.log('error when we get the data');
      else console.log('here it is - ', data);
      return data
    });
  } catch (e) {
    console.log(e);
  }
}

// insertDataIntoDb function inserts data into the MongoDB database.
async function insertDataIntoDb(data){
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { useNewUrlParser: true, bufferCommands: false });
    const feedback = new User(data);
    // 
    feedback.save((error) => {
      if (error) {
        if (error.code === 11000) {
          console.error('Error: Duplicate key found');
        } else {
          console.error('Error saving feedback: ', error);
        }
      } else {
        console.log('Feedback saved successfully!');
      }
    });
  } catch (e) {
    console.log(e.message);
  }
}

// app.get endpoint with the route "/getdata" retrieves data from the database and returns it in the response as JSON.
app.get('/getdata', async (req, res) => {
  let user = await getDataIntoDb({})
  // 
  await res.json(user)
})

// app.post endpoint with the route "/setdata" takes data from a request body, creates an object, and inserts it into the MongoDB database.
app.post('/setdata', async (req, res) => {
  const [name, email, comment] = [req.body.name, req.body.email, req.body.feedback];
  const data = Object.entries({ name, email, comment }).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  await insertDataIntoDb(data)
})

// PI server is set to listen on port 8000
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server listen to port ${PORT} ...`))


// feedbackrestapi-production.up.railway.app