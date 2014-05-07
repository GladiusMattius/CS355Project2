// Matthew Johnson
// CS355 - Project 2
// This class handles database queries and table construction.

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'matjohnson',
    password: '3968099'
});
//**********************************************************************************
connection.query('USE matjohnson', function (err) {
    if (err) throw err;
});
//**********************************************************************************
exports.getItem = function (Name,callback) {
    connection.query('select * from Item where Name = ?', Name,
        function (err, result) {
            console.log(result);
            callback(false, result);
        }
    );
}
//**********************************************************************************
exports.getAccount = function (Email,Password, callback) {
        var query ='SELECT * FROM Account WHERE Email ="' + Email + '" AND Password="' + Password + '"';
    connection.query(query, function (err, result) {
        if (err) throw err;

        console.log(result);
        callback(false, result);
    });
}
//**********************************************************************************
// This function adds an account to the account table and adds an item to the accountItemList table
exports.createAccount = function (Email, FirstName, LastName, Password, callback){
    var query = 'INSERT INTO Account VALUES(null,"' + Email + '","' + Password + '","' + FirstName + '","' + LastName + '");';
    connection.query(query,
        function (err, result) {
            if (err) throw err;
            
            query = 'SELECT AccountID FROM Account WHERE Email="' + Email +'";'
            connection.query(query, function(err, result2){
               if(err) throw err;
                
                var id = result2[0].AccountID;
                
                query = 'INSERT INTO AccountItemList VALUES(' + id + ',102);'                
                connection.query(query, function(err, result3){
                   if(err) throw err;
                    
                    console.log('Item added to new Account');
                });
                
            });
            
            callback(false, result);
        }
    );   
}
//**********************************************************************************
exports.getAllItems = function (callback){
 var query = 'select * from Item';
    connection.query(query, function (err, result){
       if(err) throw err;
            
             var responseHTML = '<table border:1px solid #5c743d; style="margin: 0px auto;background-color:#FFFFFF;padding: 5px;" id="itemTable"><tr><th>Name</th><th>Description</th><th>Price</th><th>Cart</th></tr>';
                    for (var i = 0; result.length > i; i++) {
                        responseHTML += '<tr><td id="itemName' + i + '" ><a href="/itemdetails/?Name=' + result[i].Name + '" >' + result[i].Name + '<a></td>' +
                            '<td>' + result[i].Description + '</td>' +
                            '<td id="itemPrice' + i +'" >' + result[i].Price + '</td>' + '<td><input type="checkbox" id="box' + i + '" ></td>';
                    }
                    responseHTML += '</table>';
         callback(false, responseHTML);   
        
    });
}
//**********************************************************************************
exports.getItemsByType = function (type, callback){
  var query = 'select * from Item where Type ="' + type + '"'; 
     connection.query(query, function (err, result){
       if(err) throw err;
            
             var responseHTML = '<table border:1px solid #5c743d; style="margin: 0px auto;background-color:#FFFFFF;padding: 5px;" id="itemTable"><tr><th>Name</th><th>Description</th><th>Price</th><th>Cart</th></tr>';
                    for (var i = 0; result.length > i; i++) {
                        responseHTML += '<tr><td id="itemName' + i + '" ><a href="/itemdetails/?Name=' + result[i].Name + '" >' + result[i].Name + '<a></td>' +
                            '<td>' + result[i].Description + '</td>' +
                            '<td id="itemPrice' + i +'" >' + result[i].Price + '</td>' + '<td><input type="checkbox" id="box' + i + '" ></td>';
                    }
                    responseHTML += '</table>';
         callback(false, responseHTML);   
        
    });
};
//**********************************************************************************
exports.updateAccountByID = function(accountID, Email, FirstName, Lastname, Password, callback){
  var query = 'UPDATE Account SET Email="' + Email +'", FirstName="' + FirstName + '", LastName="' + Lastname + '", Password="' + Password + '" WHERE AccountID=' + accountID + ';';
    connection.query(query, function(err, result){
       if(err) throw err;
        
        callback(false, result);
    });
 
};
//**********************************************************************************
// returns name of items account has
exports.getAccountItemsByID = function(accountID, callback){
   var query = 'SELECT i.Name FROM AccountItemList a JOIN Item i ON a.ItemID = i.ItemID WHERE AccountID=' + accountID + ';';
    connection.query(query, function(err, result){
        if(err) throw err;
        
        if(result.length > 0)
            callback(false, result);
    });
};