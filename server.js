
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
const db_config = {
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b4e08b7f3522a3',
    password : 'f6f1b50e',
    database : 'heroku_16b639d2d341f35'
}


var connection ;
function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}
handleDisconnect();

app.post("/api/login", (req, res, next) => {
   
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


app.post("/api/signup", (req, res, next) => {
   
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
