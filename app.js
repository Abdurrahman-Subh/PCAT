const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');
const app = express();

//Connect DB
mongoose
  .connect(
    'mongodb+srv://abdurrahman:a200120021972a@cluster0.hfms3.mongodb.net/pcat-db?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTING
app.get('/', photoController.getAllPhotos); //Show All Photos
app.get('/photos/:id', photoController.getPhoto); // Show Photo Page
app.post('/photos', photoController.createPhoto); //Create New Photo
app.put('/photos/:id', photoController.updatePhoto); //Update Photo
app.delete('/photos/:id', photoController.deletePhoto); //Delete Photo

app.get('/about', pageController.getAboutPage); //Get About Page
app.get('/add', pageController.getAddPage); //Get Add Page
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
