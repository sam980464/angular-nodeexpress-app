
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
//mysql://bff1ea93a381dc:5f079d48@us-cdbr-iron-east-03.cleardb.net/heroku_7e369476949ac20?reconnect=true

const mysql = require('mysql');
const dbconfig = {
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'bff1ea93a381dc',
    password : '5f079d48',
    database : 'heroku_7e369476949ac20'
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
