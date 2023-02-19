const Feedback = require("../models/Feedback");

 async function insertData(query) {
    try {
      const newUserFeedback = new Feedback(query);
      await newUserFeedback.save();
      console.log("Successfully inserted user feedback into the database.");
    } catch (error) {
      console.error(error);
      console.log("Error inserting user feedback into the database.");
    }
  }

async function findData(query) {
  try {
    // Find data in the collection based on the query object
    const data = await Feedback.find(query).exec();
    return data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

module.exports = { findData, insertData };
