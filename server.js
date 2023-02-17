//  includes the required modules including express, mongoose, cors and dotenv.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const UserFeedback = require("./models/UserFeedback");
require('dotenv').config();

// allowCrossDomain sets up CORS headers to allow cross-domain requests to the API.
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(bodyParser.urlencoded({ extended: false }));

// et up express middleware including cors, parsing of JSON and URL-encoded requests, and the allowCrossDomain function.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(allowCrossDomain)


async function insertIntoDB(userFeedbackData) {
  try {
    const newUserFeedback = new UserFeedback(userFeedbackData);
    await newUserFeedback.save();
    console.log("Successfully inserted user feedback into the database.");
  } catch (error) {
    console.error(error);
  }
}

app.post("/setdata", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const feedback = req.body.feedback;
  console.log(name);
 const obj = {fullName: name, email: email, feedback: feedback};

  try {
    const newUserFeedback = new UserFeedback(obj);
    await newUserFeedback.save();
    res.status(200).send("Successfully inserted user feedback into the database.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting user feedback into the database.");
  }
});

app.get('/', async (req, res) => {
  res.send(`hello it's alex og feedback api`)
})

app.get('/pdf', (req, res) => {
  const filePath = path.join(__dirname, 'resume[Alex].pdf');

  // Set the content type to application/pdf to force the browser to download the file
  res.type('application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
  // Read the file from disk and pipe it to the response object
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});




const PORT = process.env.PORT || 8000
try {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
      });
    })
    .catch(error => {
      console.log('error occur on og gizat');
      console.error(error);
    });
  
} catch (error) {
  console.log(error.message);
}


// feedbackrestapi-production.up.railway.app