const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})