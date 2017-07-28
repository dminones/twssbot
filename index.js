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
	request('https://demo-indigo4health.archimedesmodel.com/IndiGO4Health/IndiGO4Health', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body) // Print the google web page.
	    res.send(body);
	  }else {
	  	res.send(error);
	  }
	});
	/*
	request.post('https://demo-indigo4health.archimedesmodel.com/IndiGO4Health/IndiGO4Health')
		   .send("age=40&gender=M&height=70&weight=160&smoker=F&mi=F&stroke=T&diabetes=T&systolic=&diastolic=&cholesterol=&hdl=&ldl=&hba1c=&cholesterolmeds=&bloodpressuremeds=&bloodpressuremedcount=&aspirin=&moderateexercise=&vigorousexercise=&familymihistory=Name")
		   .end(function(error, response){
	   			if (error || !response.ok) {
	   				console.log(error);
		       		res.send(error);
		     	} else {
			        res.setHeader('Content-Type', 'application/json');
					res.send(response.body);
		     	}
		   });*/
})


app.listen(port, function () {
  console.log('Example app listening on port '.port)
})

console.log("Nice weather we're having today",twss.is("Nice weather we're having today")); // false
console.log("Can you make it harder?",twss.is("Can you make it harder?"));
console.log("You're not going fast enough!",twss.is("You're not going fast enough!"));