let Product = require('../models/product');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hamza',{useNewUrlParser:true});


let products =  [new Product({
	imagePath:'/images/products/1.jpg',
	title:"Camera High Resolution",
	description:"this is a good camera",
	category:"Smart Phone",
	price:50

}),
new Product({
	imagePath:'/images/products/2.jpg',
	title:"Camera Low Resolution",
	description:"this is a bad camera",
	category:"Smart Phone",
	price:30 

}),
new Product({
	imagePath:'/images/products/3.jpg',
	title:"Camera High Resolution",
	description:"this is a good camera",
	category:"Smart Phone",
	price:50

}),
new Product({
	imagePath:'/images/products/4.jpg',
	title:"Camera Low Resolution",
	description:"this is a bad camera",
	category:"Smart Phone",
	price:30 

})


];

let done=0;
for (let i = 0; i < products.length; i++) {
	products[i].save(function () {
		done++;
		if(done==products.length)
			exit();
	}); 
}
function exit(){
	mongoose.disconnect();
}
