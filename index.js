
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const config = require('./config/key');

const {User} = require("./models/User");

mongoose.connect(config.mongoURI, {
}).then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/register', (req,res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err});
    return res.status(200).json({
      success: true
    })
  });

  console.log(req.body);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})