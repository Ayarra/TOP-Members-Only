const mongoose = require("mongoose");

const mongodb = process.env.MONGODB_URI;
const mongoConnect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(mongodb)
    .then(() => console.log("Connected succesfuly to the db"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
