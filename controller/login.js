var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.post('/home', function (req, res) {
    db.getAccount(req.body.Email, req.body.Password, function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            var values = {
                Email: result[0].Email,
                FirstName: result[0].FirstName,
                LastName: result[0].LastName,
                ID: result[0].AccountID
            };
            res.render('accountHome', values);
        } else {
            res.render('failedLogin');
        }
    });

});

module.exports = router;