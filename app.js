const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/massiveworks");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// Set up public folder

app.use('/public', express.static('public'));

// Define app.get route for home page
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
