var express        = require('express');
var app            = express();


var port = process.env.PORT || 1234;  
var server = app.listen(port);

console.log('app running on port ' + port);

app.use(express.static(__dirname + '/app'));
app.get('/', function(req, res) {

    res.sendFile("index.html", { root: "./app"}); // load our public/index.html file

});