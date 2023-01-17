const { O_NONBLOCK } = require('constants');
const fs = require('fs');
const path = require('path');
const { nextTick } = require('process');

const { validationResult } = require("express-validator")
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {productos:products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		for (let i=0; i<products.length;i++){
			if (products[i].id == req.params.id)
			res.render("detail", {producto:products[i]})
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const resultValidation = validationResult(req);
		if (resultValidation.errors.length>0) {
			res.render("product-create-form",{
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		else {
			let obj = {
				id: products.length + 1,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: req.file.filename
			}
			products.push(obj)
			fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), err => {
				if (err) {
					console.log('Error writing file', err)
				} 
				else {
					console.log('Successfully wrote file')
				}
			})
			console.log(obj)
			res.redirect("/")
			console.log(obj)
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		for (let i=0; i<products.length;i++){
			if (products[i].id == req.params.id)
				res.render("product-edit-form", {producto:products[i]})
		}
		
	},
	// Update - Method to update
	update: (req, res) => {
			let obj = []
			products.forEach(function(producto){
				if (producto.id == req.params.id){
					producto = {
						id: producto.id,
						name: req.body.name,
						price: req.body.price,
						discount: req.body.discount,
						category: req.body.category,
						description: req.body.description,
						image : producto.image
						}
					obj.push(producto)
					}
				else{
					obj.push(producto)
				}
				})
			fs.writeFileSync(productsFilePath, JSON.stringify(obj, null, 2));
			res.render("afterDelete")
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
			let productosN = products.filter(producto => {
				return producto.id != req.params.id;
			})
			fs.writeFileSync(productsFilePath, JSON.stringify(productosN, null, 2));
			res.render("afterDelete")
		},
}
module.exports = controller;