
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-deploy'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/demo-deploy/index.html'));
});

// Start the app by listening on the default Heroku port


const mysql = require('mysql');
const dbconfig = {
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b813e86be3bf41',
    password : '47503a61',
    database : 'heroku_5a8c23471a3edc3'
}


const connection  = mysql.createConnection(dbconfig);
connection.connect(function(err) {
    if (err) throw err;
});

app.post("/login", (req, res, next) => {
   
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


app.post("/signup", (req, res, next) => {
   
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
