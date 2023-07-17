const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
console.log(process.env.DATABASE);
const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(console.log("connection successful"));
console.log(db);
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
const app = require("./app");
const port = 3000;
app.listen(port, () => {
  console.log("app running on port 3000");
});