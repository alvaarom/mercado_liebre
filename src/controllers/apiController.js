const fs = require('fs');
const path = require('path')

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));


const apiController = {

    list: (req, res) => {
        let response = {
            info: {
                status: 200,
                totalProducts: products.length,
                route: '/api/products/list'
            },
            data: products
        }
        res.json(response)
    }

};

module.exports = apiController;