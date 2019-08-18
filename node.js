var express = require('express');
var app = express();
var mysql = require('mysql');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get(['/', '/home'], (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Us'
    });
});
 app.get('/contact', (req, res) =>{
        res.render('contact',{
            title: 'Contact us'
        });
 });
app.route('/join').get(function(req, res){
	res.send('Sign up');
	title:'Sign Up';
});

	var server = app.listen(8080, function(){});
	