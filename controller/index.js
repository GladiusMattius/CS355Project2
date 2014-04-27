var express = require('express'); 
var router = express.Router(); 
var db = require('../model/db');

router.get('/', function (req, res) {
   // res.sendfile('index.html');
    res.render('index');
});

router.get('/about', function (req, res) {
    res.render('about');
});

router.get('/itemdetails', function (req, res) {
    db.getItem(req.query.Name, function (err, result) {
        if (err) throw err;

        res.render('itemDetails', {rs: result});
    });
});

router.get('/login', function (req, res) {
    res.render('login', { action: '/login/home'});
});

router.get('/createAccount', function (req, res) {
    res.render('createAccount', { action: '/createAccount/home' });
}); 

router.get('/store', function (req, res) {
    res.sendfile('store.html');
});

router.post('/store', function (req, res) {
        console.log(req.body);
        if (req.body.itemtype == 2) { 
        db.getAllItems(function (err, result) {
        if (err) throw err;
            
        if(result.length > 0)
            res.send(result);
        else
            res.send(' No items Found');
    });
            
    } else {
        db.getItemsByType(req.body.itemtype, function (err, result){
           if (err) throw err;
            
            if(result.length > 0)
                res.send(result);
            else
                res.send('No items Found');
        });
    }
});

module.exports = router; 
