// Matthew Johnson
// CS355 - Project 2

var express = require('express');
var router = express.Router();
var db = require('../model/db');
//**********************************************************************************
router.get('/', function (req, res) {
    res.render('index');
});
//**********************************************************************************
router.get('/about', function (req, res) {
    res.render('about');
});
//**********************************************************************************
router.get('/itemdetails', function (req, res) {
    db.getItem(req.query.Name, function (err, result) {
        if (err) throw err;

        res.render('itemDetails', {
            rs: result
        });
    });
});
//**********************************************************************************
router.get('/login', function (req, res) {
    res.render('login', {
        action: '/login/home'
    });
});
//**********************************************************************************
router.get('/failedLogin', function (req, res) {
    res.render('failedLogin', {
        action: '/login/home'
    });
});
//**********************************************************************************
router.get('/createAccount', function (req, res) {
    res.render('createAccount', {
        action: '/createAccount/home'
    });
});
//**********************************************************************************
router.get('/store', function (req, res) {
    res.sendfile('store.html');
});
//**********************************************************************************
router.post('/checkout', function (req, res) {
    var itemList = JSON.parse(req.body.items);
    var priceList = JSON.parse(req.body.prices);
    res.render('checkout', {items: itemList, prices: priceList});
});
//**********************************************************************************
router.post('/store', function (req, res) {
    console.log(req.body);
    if (req.body.itemtype == 2) {
        db.getAllItems(function (err, result) {
            if (err) throw err;

            if (result.length > 0)
                res.send(result);
            else
                res.send(' No items Found');
        });

    } else {
        db.getItemsByType(req.body.itemtype, function (err, result) {
            if (err) throw err;

            if (result.length > 0)
                res.send(result);
            else
                res.send('No items Found');
        });
    }
});
//**********************************************************************************
router.post('/editAccount', function (req, res){
   console.log(req.body.accountID);
    var accountID = req.body.accountID;
    res.render('editAccount',{ID: accountID});
});
//**********************************************************************************
router.post('/updateAccount', function(req, res){

 /*   var values = {
        Email: req.body.Email,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        ID: req.body.accountID
    }; */

    db.updateAccountByID(req.body.accountID, req.body.Email, req.body.FirstName, req.body.LastName, req.body.Password, function(err, result){
       if(err) throw err;
        
                    
                db.getAccountItemsByID(req.body.accountID, function (err, itemList) {
                    if (err) throw err;
                    console.log(itemList);
                var values = {
                    Email: req.body.Email,
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    ID: req.body.accountID,
                    items: itemList
                };
                    res.render('accountHome', values);
                });
        
        //res.render('accountHome', values);
    });
    
});
module.exports = router;