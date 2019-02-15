
//Install express server
const express = require('express');
const path = require('path');

const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-deploy'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/demo-deploy/index.html'));
});

// Start the app by listening on the default Heroku port
//mysql://bff1ea93a381dc:5f079d48@us-cdbr-iron-east-03.cleardb.net/heroku_7e369476949ac20?reconnect=true

const mysql = require('mysql');
const dbconfig = {
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b4e08b7f3522a3',
    password : 'f6f1b50e',
    database : 'heroku_16b639d2d341f35'
}


const connection  = mysql.createConnection(dbconfig);
connection.connect(function(err) {
    if (err) throw err;
});

app.post("/api_login", (req, res, next) => {
   
   var username = req.body.uname;
   var pass = req.body.password;
   console.log(username);
   console.log(pass);
   connection.query("select * from users where username='"+username + "' and password='"+pass+"' ",(err,response)=>{
	   if (err) throw err;
	   if(response){
		res.send(response);	
	   }else{
		   res.send("{}");
	   }
	   
   })
  
});


app.post("/api_signup", (req, res, next) => {
   
   var email  = req.body.email;
   var mobile = req.body.mobile;
   var uname  = req.body.uname;
   var pass   = req.body.password;
   connection.query("insert into users (email,mobi_no,username,password) values('"+email+"','"+mobile+"','"+uname+"','"+pass+"')",(err,response)=>{
	   if (err) throw err;
	   if(response){
		res.send(response);	
	   }else{
		   res.send("{}");
	   }
	   
   })
  
});


app.listen(process.env.PORT || 8080);
