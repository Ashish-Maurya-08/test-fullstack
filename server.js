const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const login = require('./routes/login');
const db_actions = require('./routes/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

require("dotenv").config();
const mongoString = process.env.MONGO_URI;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/login', login); 
app.use('/db', db_actions);
app.use('/pics',express.static(path.join(__dirname,'pics')))


mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log('Database Connected');
})


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});