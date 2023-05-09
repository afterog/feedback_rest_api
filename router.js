const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');
const { findData, insertData } = require('./crud');

// Middleware function to log incoming requests
const requestLogger = (req, res, next) => {
  console.log(`Received ${req.method} request at ${req.originalUrl}`);
  next();
};

// Apply middleware to all routes in this router
route.use(requestLogger);

// Define routes
route.post("/setdata", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const feedback = req.body.feedback;
  const obj = { fullName: name, email: email, feedback: feedback };
  const data = await findData({ fullName: name })


  if (await insertData(obj)) {
    res.status(200).send(true)
  }
  else {
    res.send(false)
  }

});

route.get('/getdata', async (req, res) => {
  const data = await findData({})
  console.log('send data from database to client');
  res.send(data)
})

route.get('/pdf', (req, res) => {
  let url = __dirname
  url = url.replace(/\\routes$/, "");
  url = path.join(url, 'Alemayehu[CV].pdf')

  // Set the content type to application/pdf to force the browser to download the file
  res.type('application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Alemayehu[CV].pdf"');
  // Read the file from disk and pipe it to the response object
  const stream = fs.createReadStream(url);
  stream.pipe(res);
});

module.exports = route;
