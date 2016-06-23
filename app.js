var express = require('express');
var promise = require('bluebird');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// body-parser for url encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var options =  {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://postgres:ADRIAN88@localhost:5432/sports_app');

app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));


app.get('/',function(req,res,next){
  res.render('index',{layout: 'homeLayout.hbs'});
});

app.get('/nba',function(req,res,next){
  db.any('SELECT * FROM nbateams')
  .then(function(data) {
    res.render('nba', {data: data});
  })
  .catch(function(err){
    return next(err);
  });
});


app.get('/mlb',function(req,res,next){
  res.render('mlb');
});

app.get('/nfl',function(req,res,next){
  res.render('nfl');
});

app.get('/soccer',function(req,res,next){
  res.render('soccer');
});

// db methods

// get one nba team
app.get('/nba/:id', function(req,res,next){
  var teamname = req.params.id;
  console.log(teamname);
  db.one('SELECT * FROM nbateams WHERE teamname = $1', teamname)
  .then(function (team) {
    console.log(team);
  })
  .catch(function(err){
  return next(err);
  });
});


// function initNBAList(res,e) {
//    var select = res.document.getElementById("nbalist");
//    var teams = new Array();
//    teams = e.Teamname;
//    for(var i = 0; i < teams.length ; i++) {
//       var team = res.document.createElement("option");
//       team.textContent = teams[i];
//       select.appendChild(team);
//    }
// }



app.listen(3000);