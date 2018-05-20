// J48eJVD4p0MbKiyehtrAs9vH28AK0 legendaryemailbot@gmail.com
var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var url = require('url');

let name;
let email;
let message;

app.use(express.static('public'))

app.get('/', function(req, res){
	res.render("index");
});
app.get('/message*/', function(req, res){
	if (!(url.parse(req.url, true).query.name)){
		res.send("You did not give me your name!")
	}
	if (!(url.parse(req.url, true).query.email)){
		res.send("You did not give me your email! or it was not proper.")
	}
	if (!(url.parse(req.url, true).query.message)){
		res.send("You did not give me your message!")
	}

	name = url.parse(req.url, true).query.name
	email = url.parse(req.url, true).query.email
	message = url.parse(req.url, true).query.message
	try{
		let transporter = nodemailer.createTransport({
			service: "gmail",
			secure: false,
			port: 25,
			auth: {
				user: 'legendaryemailbot@gmail.com',
				pass: 'J48eJVD4p0MbKiyehtrAs9vH28AK0'
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		let HelperOptions = {
			from: '"Fupilio" < legendaryemailbot@gmail.com',
			to: 'mickmon12@gmail.com',
			subject: `Customer "${name}" contacted you"`,
			text: `the users email is "${email}", His message is "${message}"`
		};
		transporter.sendMail(HelperOptions, (error, info) => {
			if(error){
				return console.log("this is the error" + error)
			}
		});
	}catch(err){
		res.send("Error happened while sending the email...")
	}


	res.send(`${name} Your message "${message}" was sent successfully<br><a href="/"><button>Home</button></a>`)
});
app.get('/*/', function(req, res){
	res.send("<h1>404 Nothing here buddy</h1>");
});
app.listen(8080, function(){
	console.log("Listening on port 8080");
});