var express = require('express');
var routes = require('/routes');
var http = require('http');
var path = require('path');
var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
var db = mongoskin.db(dbUrl,{safe: true});
var collections = {
    articles: db.collection('articles'),
    users: db.collection('users')
}

var session = require('express-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
app.locals.appTitle = 'blog-express';

app.use(function(req,res,next){
    if(!collections.articles || !collections.users) return next(new Error('No collections.'));
    req.collections = collections;
    return next();
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');

http.createServer(app).listen(
    app.get('port'),function(){
        console.log('Server is listening...');
    }
);