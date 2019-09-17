var User = require('./models/user');

module.exports = function(app, passport){

app.get('/about', function(req,res) {
    res.render('./about.ejs', { user: req.user });
})

app.get('/home', function(req,res) {
    res.render('./index.ejs', { user: req.user });
})

app.get('/contatti', function(req,res) {
    res.render('./contatti.ejs', { user: req.user });
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




//app.set('views', __dirname + '/views');

//app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', isLoggedIn, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}


/* function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
    }*/

    res.redirect('/login');
    }
}