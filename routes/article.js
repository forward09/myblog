exports.show = function(req, res, next){
    if(!req.params.slug) return next(new Error('No article slug'));
    req.collections.articles.findOne({slug: req.params.slug}, function(error, article){
        if(error) return next(error);
        if(!article.published) return res.send(401);

        res.render('article', article);
    })
};

exports.list = function(req, res, next){
    req.collections.articles.find({}).toArray(function(error, items){
        if(error) return next(error);

        res.send({articles: items});
    });
};

exports.add = function(req, res, next){
    if(!req.body.article) return next(new Error('No article'));

    var article = req.body.article;
    article.published = false;

    req.collections.articles.insert(article, function(error, articleResponse){
        if(error) return next(error);
        res.send(articleResponse);
    });
};

exports.edit = function(req, res, next){
    if(!req.params.id) return next(new Error('No article'));
    if(!req.body.article) return next(new Error('No article'));

    var article = req.body.article;

    req.collections.articles.updateById(req.params.id, {$set: article}, function(error, response){
        if(error) return next(error);
        res.send({affectedCount: response});
    });
}