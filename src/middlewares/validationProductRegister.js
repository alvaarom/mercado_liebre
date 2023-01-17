const path = require('path');
const { body } = require("express-validator");
module.exports = [
    body("name").notEmpty().withMessage("Tienes que ingresar el nombre del producto"),
    body("price").notEmpty().withMessage("Tienes que ingresar el precio del producto"),
    body("discount").notEmpty().withMessage("Tienes que ingresar el porcentaje de descuento"),
    body("description").notEmpty().withMessage("Tienes que agregar la descripción del producto"),
    body("category").notEmpty().withMessage("Tienes que elegir la categoría del producto"),
    body("image").custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = [".jpg", ".png", ".gif"]
        
        if (!file){
            throw new Error("Tiene que adjuntar una imagen")
        }
        else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error("Extensión de imagen no valida")
            }
        }
        
        return true;
    })
]

