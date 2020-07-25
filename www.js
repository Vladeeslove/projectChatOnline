const exp = require("express");

var app = exp();

app.get('/', function(req, res){
    res.send('hello Diana and Vlad');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

