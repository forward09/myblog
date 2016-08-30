var mongo = require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = 27017;

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;

var db = new Db('local', new Server(dbHost, dbPort), {safe: true});

db.open(function(error, dbConnection){
    if(error){
        console.log(error);
        process.exit(1);
    }

    console.log('dbState: ', db._state);

    item = {name: 'winfred xu'};

    dbConnection.collection('message').insert(item, function(error, item){
        if(error){
            console.log(error);
            process.exit(1);
        }

        console.info('created/inserted: ', item);

        db.close();

        process.exit(0);
    });
});