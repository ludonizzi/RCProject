const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors'); // We will use CORS to enable cross origin domain requests.
require('dotenv/config');
var flash = require('connect-flash');


const passport        =     require('passport')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , config            =     require('./configuration/config')



  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to DB');
  });
  //Connessione al DB
  mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,
      useUnifiedTopology: true } );
  require('./configuration/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  
  
app.use(cookieParser());
app.use(session({ secret: 'ciaobello', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');


//app.set('view engine', 'jade');
//app.use(express.static('public')); //abbiamo istruito express per andare nella dir public ed inserire file statici

require('./app/routes.js')(app, passport);

WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    
    wss.on('connection', function(ws) {
        console.log('connected');
        ws.on('message', function(msg) {
            data = JSON.parse(msg);
            if (data.message) wss.broadcast('<strong>' + data.name + '</strong>: ' + data.message);
        });
    });



app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})