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
        fname: req.body.fname,
		lname:req.body.lname

    });
});

app.get('/join', (req, res) =>{
	res.render('join');
	title:'Sign Up';
});

app.get('/info' ,( req,res) =>{
	
	try{
            var allUsers = [];
            getUsers(allUsers,res);
        }
        catch(error){
            console.log('error with database!');
			console.log(error);
        } 
	
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
        html: 'Thank you for reaching out to us. Someone will get back to you as soon as possible'
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



function getUsers(info, res){
    var con = mysql.createConnection({
	host: "localhost",
	port: 3308,
	user: "root",
	password: "",
	database: "finalproject"
});
    con.connect(function(err){
       
        if(err) throw err;
        else{
            console.log("connected!");
        }
        var sql="select * from userinfo where userid = (select max(userid) from userinfo)";
        con.query(sql, function(err, result, fields){
            if (err){
                console.log("error here");
                console.log("err");
                throw err;
            } 
            for(var i = 0; i < result.length; i++){
                var User = {
                    'fname':result[i].UserFName,
                    'lname':result[i].UserLName,
                    'email':result[i].UserEmail,
                    'phone':result[i].UserPhoneNumber,
                   
                }
                info.push(User);
            }
            for(var i = 0; i < info.length; i++){
                console.log(info[i]);
            }
            console.log("done looping");
            
            res.render('info', {
                title: 'User listing',
                list: info
            });
        });
        
    });
    
}


  
	
