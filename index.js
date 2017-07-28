var twss = require('twss');
var express = require('express');
var app = express();
var request = require('request');

// set the port of our application
var port = process.env.PORT || 3000;

// make express look in the client directory for assets (css/js/img/html)
app.use(express.static(__dirname + '/client'));

app.get('/twss', function (req, res) {
	console.log(decodeURIComponent(req.query.q));
    res.setHeader('Content-Type', 'application/json');
	res.send({ twss: twss.is(decodeURIComponent(req.query.q)) })
})

app.post('/indigo4health', function (req, res) {
	const child_process = require('child_process');
	console.log("curl -H GET https://demo-indigo4health.archimedesmodel.com/IndiGO4Health/IndiGO4Health");
	child_process.exec('curl -H POST -d "'+req.body+'" https://demo-indigo4health.archimedesmodel.com/IndiGO4Health/IndiGO4Health', (err, stdout, stderr) => {
	  if (err) {
	    // node couldn't execute the command
	    console.log(err);
	    return;
	  }

	  // the *entire* stdout and stderr (buffered)
	  console.log(`stdout: ${stdout}`);
	  console.log(`stderr: ${stderr}`);
	  res.send(stdout);
	});
})


app.listen(port, function () {
  console.log('Example app listening on port '.port)
})

console.log("Nice weather we're having today",twss.is("Nice weather we're having today")); // false
console.log("Can you make it harder?",twss.is("Can you make it harder?"));
console.log("You're not going fast enough!",twss.is("You're not going fast enough!"));