let express = require('express');
let myRouter = express.Router();
let Product = require('../models/product');

/* GET home page. */
myRouter.get('/', function(req, res, next) {
	
	Product.find(function(err,docs){
		let productChunks =[];
		let chunkSize=3;
		for (let i = 0; i < docs.length; i+=chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize));
		}
		res.render('shop/index', { title: 'Commercial Web Site',porducts:productChunks });
	});
	
});

module.exports = myRouter;
