// Matthew Johnson
// CS355 - Project 2

var express = require('express');
var router = express.Router();
var db = require('../model/db');

//**********************************************************************************
router.post('/home', function (req, res) {
    db.createAccount(req.body.Email, req.body.FirstName, req.body.LastName, req.body.Password, function (err, result) {
        if (err) throw err;
        // used to get account ID
        db.getAccount(req.body.Email, req.body.Password, function (err, result) {
            if (err) throw err;

            if (result.length > 0) {
                db.getAccountItemsByID(result[0].AccountID, function (err, itemList) {
                    if (err) throw err;
                    console.log(itemList);
                var values = {
                    Email: result[0].Email,
                    FirstName: result[0].FirstName,
                    LastName: result[0].LastName,
                    ID: result[0].AccountID,
                    items: itemList
                };
                    res.render('accountHome', values);
                });


            } else {
                res.render('failedLogin');
            }
        });
    });
});
//**********************************************************************************
module.exports = router;