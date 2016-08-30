var mongoskin = require('mongoskin');
var dbHost = 'mongodb://127.0.0.1';
var dbPort = 27017;

var db = mongoskin.db(dbHost+':'+dbPort+'/local', {safe:true});



db.bind('message').bind({
    findOneAndAddText : function (text, fn){
        db.message.findOne({}, function(error, item){
            if(error){
                console.error(error);
                process.exit(1);
            }
            console.info('findOne:　', item);
            item.text = text;
            var id = item._id.toString();
            console.info('before saving:', item);
            db.message.save(item, function(error, count){
                console.info('save: ', count);
                return fn(count, id);
            });
        })
    }
});


db.message.findOneAndAddText('hi, I love you', function(count, id){
    db.message.find().toArray(function(error,items){
        console.info('find: ', items);
        db.close();
        process.exit(0);
    });
}); 