var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var request = require('request');
var app = express();

app.set('views', path.join(__dirname, 'views')); //setting views
app.engine('handlebars', exphbs({defaultLayout: 'main'})); //setting handlebars 
app.set('view engine', 'handlebars'); //setting view engine to use handlebars

// set public folder

app.use(express.static(path.join(__dirname, 'public')));
//setting port
app.set('port', (process.env.PORT || 3000));

var people = [
				{
					firstName : 'Krish',
					lastName  : 'Sai'
				},
				{
					firstName : 'kiran',
					lastName  :' killer'
				}
		];

// var posts = [
//     {
//       author: "Internet Desk",
//       title: "Panneerselvam, Deepa join hands at Jayalalithaa's memorial",
//       description: "Wherever I am, I will be handling the party affairs, says Saiskala addressing the media at Poes Garden",
//       url: "http://www.thehindu.com/news/national/tamil-nadu/Live-Supreme-Court-ruling-on-Sasikalas-disproportionate-assets-case/article17298985.ece",
//       urlToImage: "http://www.thehindu.com/incoming/article17303413.ece/ALTERNATES/LANDSCAPE_615/DEEPA%20OPS%201%20jpg",
//       publishedAt: "2017-02-14T19:15:07Z"
//     },
//     {
//       author: "Krishnadas Rajagopal",
//       title: "Jayalalithaa, Sasikala criminally conspired at Poes Garden to launder ill-gotten wealth: SC",
//       description: "SC verdict accuses Jayalalithaa as a mastermind who misused her public office",
//       url: "http://www.thehindu.com/news/national/tamil-nadu/Jayalalithaa-Sasikala-criminally-conspired-at-Poes-Garden-to-launder-ill-gotten-wealth-SC/article17301596.ece",
//       urlToImage: "http://www.thehindu.com/news/national/tamil-nadu/article17301664.ece/ALTERNATES/LANDSCAPE_615/IN14%20JAYA%20AND%20SASI",
//       publishedAt: "2017-02-14T12:29:38Z"
//     }]
//routes

  httpGet = function(url, callback){
	request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("---=======HERE@=========")
    console.log(body)
    
    console.log("sucesss!!")
              //console.log(data.data)
    callback(error, body) // Show the HTML for the Google homepage. 
  }
  else {
            callback(error, response)
          }
});
};





app.get('/', function (req, res) {
	res.render('home', {
		content: 'Krishna sai content',
		published: true,
		people: people
	});
});

app.get('/latest', function (req, res) {
	httpGet("http://localhost:4000/news/latest",function (err, resp) {
      if (err) {
        console.log('Oops something went wrong temporary problem!');
        req.flash('error_msg', 'Oops something went wrong temporary problem!');
        res.redirect('/error');
      }
      else {
      	console.log("---=======I am here=========")
        console.log (resp);
        var a = resp
		res.render('latest',{posts: a});
      }
    });
});

//server listning on 
app.listen(app.get('port'), function () {
	console.log('Server started on port '+app.get('port'));
});
