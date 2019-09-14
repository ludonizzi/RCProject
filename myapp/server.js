const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cors = require('cors'); // We will use CORS to enable cross origin domain requests.
require('dotenv/config');


const passport        =     require('passport')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , config            =     require('./configuration/config')
//, mysql             =     require('mysql')

/*Define MySQL parameter in Config.js file.
const pool = mysql.createPool({
  host     : config.host,
  user     : config.username,
  password : config.password,
  database : config.database
});*/


//Schema del database
var schemaName = new Schema({
  request: String,
  time: Number
  }, {
  collection: 'collectionName'
});

var Model = mongoose.model('Model', schemaName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

//Connessione al DB
mongoose.connect(process.env.DB_CONNECTION,
  { useNewUrlParser: true,
    useUnifiedTopology: true } );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'jade');
app.use(express.static('public')); //abbiamo istruito express per andare nella dir public ed inserire file statici

app.get('/about', function(req,res) {
    res.redirect('about.html');
})

app.get('/home', function(req,res) {
    res.redirect('index.html');
})

app.get('/contatti', function(req,res) {
    res.redirect('contatti.html');
})

app.get('/login', function(req,res) {
    res.redirect('loginFB.html');
})


app.get('/greetings/:name', function(req,res) { //quando arriva una get con url /greetings allora renderizza il file index.jade
    var userName = req.params.name; //url parametrico
    res.render('index',{title: 'This is a nodeJS course', message: 'hello ' + userName + ',i am your first application'})
})

app.post('/new-user', (req,res) => {
    console.log('This is the body:', req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var message = {
                   title: 'The user was created',
                   text: 'User created',
                   firstName: firstName,
                   lastName: lastName
                    }
    res.render('user-confirm', message);
})



// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database) {
        // if sets to true
        pool.query("SELECT * from user_info where user_id="+profile.id, (err,rows) => {
          if(err) throw err;
          if(rows && rows.length === 0) {
              console.log("There is no such user, adding now");
              pool.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
          } else {
              console.log("User already exists in database");
          }
        });
      }
      return done(null, profile);
    });
  }
));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}



app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})