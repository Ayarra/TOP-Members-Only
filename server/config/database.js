const mongoose = require("mongoose");

const connection_string =
  "mongodb+srv://insan:insan-insan@cluster0.p37x07g.mongodb.net/members_only?retryWrites=true&w=majority";

const mongodb = process.env.MONGODB_URI || connection_string;
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
