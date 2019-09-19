var User = require('./models/user');
var amqp = require('amqplib/callback_api');

module.exports = function(app, passport){

app.get('/about', function(req,res) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at about page!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });

    res.render('./about.ejs', { user: req.user });
})

app.get('/home', function(req,res) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at home!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  res.render('./index.ejs', { user: req.user });
})

app.get('/contatti', function(req,res) {
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at contacts page!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    }); 
});

    res.render('./contatti.ejs', { user: req.user });
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

app.get('/chat', function(req, res){
  res.render('./chat.ejs', {user: req.user});
})

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));


app.get('/', function(req, res){
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at Home!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  res.render('index', { user: req.user });
});

app.get('/signup', function(req, res){
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at Signup page!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  res.render('signup.ejs',  { message: req.flash('signupMessage') });
});

app.get('/login', function(req, res){
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at Login page!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  res.render('login.ejs',  { message: req.flash('loginMessage') });
});

app.get('/account', isLoggedIn, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res){
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'You are at Profile page!';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  res.render('profile.ejs', { user: req.user });
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));


app.get('/logout', function(req, res){
  amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'queue_example';
        var msg = 'Logout successfull';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" ---- Sent: %s ----", msg);
    });
  });
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
  }
  res.redirect('/login');
    }
}