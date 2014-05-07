var express = require('express'), // web framework
    ejs = require('ejs'), // templates
    connect = require('connect'); // GET and POST request parser

var routes = require('./controller/index');
var login = require('./controller/login');
var createAcct = require('./controller/createAccount');

var app = express();
app.use(connect.urlencoded());
app.use(connect.json());
app.use(express.static('public'));

app.set('view engine', 'ejs'); // set .ejs as the default template extension.
app.set('views', __dirname + '/views'); //set where view templates are located

app.use('/', routes);
app.use('/login', login); 
app.use('/createAccount', createAcct);


// Begin listening
app.listen(8009);