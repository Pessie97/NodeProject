var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');


app.use(express.static(__dirname + '/public'));

//start home page


app.get(['/','/home'], (req, res) =>{
    res.render('home', {
        title: 'Home'
    });
});

//go to about page
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Us'
    });
});
//go to contact us page
 app.get('/contact', (req, res) =>{
        res.render('contact',{
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
 
 
 //go to join page
app.route('/join').get(function(req, res){
	res.send('Sign up');
	title:'Sign Up';
});

app.get('/info' ,( req,res) =>{
	res.send('DB Info');
	title:'DB Info';
	
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
  var sql="select * from userinfo where userid = (select max(userid) from userinfo)";
  console.log("sql " + sql);
  con.query(sql,  (error, results)=> {
            if (error) {
			console.log(error);
			res.json({"error":true});
			throw error;}
			else{
				console.log(results);
				res.json(results);
			}
            
          });
  }
});
});

app.post('/setup' (req, res) => {
	join(req.body.fname,req.body.lname,req.body.email,req.body.password,req.body.phone );
	res.redirect('/info')
});

	//var server = app.listen(8080, function(){});
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
	"values( '"+fname +"', '"+lname"','"+email"', '"+email"', '"+pword"', '"+phone"')";
	console.log ("sql" + sql);
	con.query(sql, function (error, results, fields) {
            if (error) throw error;
            res.redirect('/info');
          });
	});

}