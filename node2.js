var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use('/', express.static(__dirname + '/public'));

app.get(['/', '/home'], (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});


const server = app.listen(8080, () => {
    console.log(`Express running -> PORT ${server.address().port}`);
});