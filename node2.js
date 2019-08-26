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

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Us'
    });
});

//go to contact us page
 app.get('/contactus', (req, res) =>{
        res.render('contactus',{
            title: 'Contact us'
        });
 });
 
 app.post('/submitContact', (req, res) => {
    //Send them a confirmation email
    sendEmail(req.body.email);
    console.log(req.name);
    res.render('confirmation', {
        title: 'Confirmation',
        name: req.body.name,
        

    });
});

app.get('/join', (req, res) =>{
	res.render('join');
	title:'Sign Up';
});

app.get('/info' ,( req,res) =>{
	res.render('info');
	title:'DB Info';
	
	var con = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "",
  database: "finalproject"
});
	con.connect(function(err) {
  if (err) 
	  throw err;
  else{
  console.log("Connected!");
  var sql="select * from userinfo where userid = (select max(userid) from userinfo)";
  console.log("sql " + sql);
  con.query(sql,  (error, results)=> {
            if (error) {
			console.log(error);
			res.json({"error":true});
			//throw error;
			}
			else{
				console.log(results);
				res.json(results);
				}
            
			});
		}
	});
});
/*
app.get('/setup' (req, res) => {
	join(req.body.fname,req.body.lname,req.body.email,req.body.password,req.body.phone );
	res.redirect('/info')
});
*/
app.get('/setup', (req, res) => {
    var con = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "",
  database: "finalproject"
});
	con.connect(function(err) {
  if (err) throw err;
  else{
  console.log("Connected!");
  }
  
  var sql = "insert into userinfo (  UserFName, UserLName, UserName, UserEmail, UserPassword, UserPhoneNumber) "+
	"values( '"+req.body.fname +"', '"+req.body.lname+"','"+req.body.email+"', '"+req.body.email+"', '"+req.body.password+"', '"+req.body.phone+"')";
	console.log ("sql" + sql);
	con.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/info');
          });
	});
	res.redirect('/info');
});


const server = app.listen(8080, () => {
    console.log(`Express running -> PORT ${server.address().port}`);
});


function sendEmail(emailAdd){
    var transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'schusterchaya@gmail.com',
            pass: 'r@ndom123'
        }
    });

    var mailOptions = {
        from: 'schusterchaya@gmail.com', 
        to: emailAdd,
        subject: 'Contact Confirmation', 
        html: 'Hi there! <br> This is a confirmation email for your requested phone call <br> One of our dedicated advisors will be calling you shortly.<br>Looking forward to speaking with you, <br>The New College'
    };

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
         else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function join(fname, lname, email, pword, phone){
	var con = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "",
  database: "finalproject"
});
	con.connect(function(err) {
  if (err) throw err;
  else{
  console.log("Connected!");
  }
  
  var sql = "insert into userinfo (  UserFName, UserLName, UserName, UserEmail, UserPassword, UserPhoneNumber) "+
	"values( '"+fname +"', '"+lname+"','"+email+"', '"+email+"', '"+pword+"', '"+phone+"')";
	console.log ("sql" + sql);
	con.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/info');
          });
	});

}