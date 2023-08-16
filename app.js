const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require("passport");
const { connect, connection } = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Assuming you have a User model defined
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const app = express();
// Load environment variables
dotenv.config();
require("./passport");
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("dev"));
app.use(passport.initialize())


//cors policy ----- edit before pushing to aws

// Set view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.set("strictQuery", false);
console.log(process.env.MONGODB_URI);
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Handle connection errors
connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

// Handle disconnects
connection.on("disconnected", () => {
  console.log("Database disconnected");
});

// Handle app termination
process.on("SIGINT", () => {
  connection.close(() => {
    console.log("Database connection closed due to app termination");
    process.exit(0);
  });
});
// Set up public folder
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Define app.get route for home page
app.get('/', (req, res) => {
  res.render('home');
});
app.get('/about', (req, res) => {
  //send a get request to the api on localhost:1337 with token in header
  axios.get("http://localhost:1337/api/tests", {
  headers: {
      Authorization: `Bearer f84e6180d6f5f02ba6b83051bd2dcc485a90aef06e53427017460a34e0ea4f58eedac10c8963967b3d508c724a2ca21aa5aa83003dc51d325c4af777dacbf4d44f95fe95c32f39f475e1131a2e9e455bb526a9d5daeda823b5f582e616bdb40f07e4aa93e203922c0cb1e8d07e20facbdff2d422131406a6624b7f91820849d0`
  }}).then((response) => {
    console.log(response.data);
  }).catch((error) => {
    console.log(error);
  })


  res.render('about');
});
app.get('/work', (req, res) => {
  res.render('work');
})

// Login route
app.use("/auth",require("./routes/auth"));
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
