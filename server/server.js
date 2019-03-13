// console.log(__dirname + '/../public'); //older version

const path = require('path');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 8080;

const express = require('express');
const app = express();

app.use(express.static(publicPath));

app.listen(8080, ()=> {
  console.log(`Server Up on ${port}`);
})
