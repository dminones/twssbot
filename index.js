var twss = require('twss');
var express = require('express');
var app = express();

// set the port of our application
var port = process.env.PORT || 8080;

// make express look in the client directory for assets (css/js/img/html)
app.use(express.static(__dirname + '/client'));

app.get('/:q', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
	res.send({ twss: twss.is(req.params.q) })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

console.log("Nice weather we're having today",twss.is("Nice weather we're having today")); // false
console.log("Can you make it harder?",twss.is("Can you make it harder?"));
console.log("You're not going fast enough!",twss.is("You're not going fast enough!"));