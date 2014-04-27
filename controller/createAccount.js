var express = require('express');
var router = express.Router();
var db = require('../model/db');

router.post('/home', function (req, res) {

    db.createAccount(req.body.Email, req.body.FirstName, req.body.LastName, req.body.Password, function (err, result) {
        if (err) throw err;
        console.log(result);
        var values = {
            Email: req.body.Email,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName
        };
        res.render('accountHome', values);
    });

});
module.exports = router;