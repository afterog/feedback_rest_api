const Feedback = require("./Feedback");

 async function insertData(query) {
    try {
      const newUserFeedback = new Feedback(query);
      await newUserFeedback.save();
      console.log("Successfully inserted user feedback into the database.");
      return true
    } catch (error) {
      console.error(error);
      console.log("Error inserting user feedback into the database.");
      return false
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
