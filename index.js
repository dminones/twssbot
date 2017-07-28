var twss = require('twss');
var express = require('express');
var app = express();
var request = require('request');
const child_process = require('child_process');
var bodyParser = require('body-parser');

// set the port of our application
var port = process.env.PORT || 3000;

// make express look in the client directory for assets (css/js/img/html)
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/twss', function (req, res) {
	console.log(decodeURIComponent(req.query.q));
    res.setHeader('Content-Type', 'application/json');
	res.send({ twss: twss.is(decodeURIComponent(req.query.q)) })
})

app.post('/indigo4health', function (req, res) {

	const searchParams = Object.keys(req.body).map((key) => {
		if(Array.isArray(req.body[key])) {
			var arrayItem = req.body[key];
			return Object.keys(arrayItem).map((k) => {
				return key + '=' + encodeURIComponent(arrayItem[k]);
			}).join('&');
		} else {
			return encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key]);
		}
	}).join('&');

	var curlCall = 'curl -H "Content-Type: application/x-www-form-urlencoded" -X  POST -d \''+searchParams+'\' https://demo-indigo4health.archimedesmodel.com/IndiGO4Health/IndiGO4Health';
	console.log(req.body);
	console.log(curlCall);


	child_process.exec(curlCall, (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
	    console.log(err);
	    return;
	  }

	  // the *entire* stdout and stderr (buffered)
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	  res.setHeader('Content-Type', 'application/json');
	  res.send(stdout);
	});
})


app.listen(port, function () {
  console.log('Example app listening on port '.port)
})

console.log("Nice weather we're having today",twss.is("Nice weather we're having today")); // false
console.log("Can you make it harder?",twss.is("Can you make it harder?"));
console.log("You're not going fast enough!",twss.is("You're not going fast enough!"));