const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

const Photo = require('./models/Photos');

const { urlencoded } = require('express');
const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ROUTING
app.get('/', async (req, res) => {
  const photos = await Photo.find({});

  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
