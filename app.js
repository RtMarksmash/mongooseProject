const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const dotenv = require('dotenv').config();

const errorController = require('./controllers/error');
//const User = require('./models/user');

const app = express();

const user_db = process.env.DB_USER;
const password_db = process.env.DB_PASSWORD;

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next) => {
    User.findById('5baa2528563f16379fc8a610')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
}); */

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(
        `mongodb+srv://${user_db}:${password_db}@cluster0.z9aglvc.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(result => {
        app.listen(config.port, () => {
            console.log(config.message)
        });
    })
    .catch(err => {
        console.log(err);
    });