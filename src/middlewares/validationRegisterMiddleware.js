const path = require('path');
const { body } = require("express-validator");
module.exports = [
    body("nombre").notEmpty().withMessage("Tienes que ingresar un nombre"),
    body("apellido").notEmpty().withMessage("Tienes que ingresar un apellido"),
    body("usuario").notEmpty().withMessage("Tienes que ingresar usuario"),
    body("contraseña").notEmpty().withMessage("Tienes que ingresar una contraseña"),
    body("contraseñart").notEmpty().withMessage("Tienes que reingresar una contraseña"),
    body("email").notEmpty().withMessage("Tienes que ingresar un email"),
    body("direccion").notEmpty().withMessage("Tienes que ingresar la calle"),
    body("nroCalle").notEmpty().withMessage("Tienes que ingresar el número de calle"),
    body("provincia").notEmpty().withMessage("Tienes que elegir una provincia"),
    body("codPostal").notEmpty().withMessage("Tienes que ingresar el codigo postal"),
    body("fechaNac").notEmpty().withMessage("Tienes que ingresar la fecha de nacimiento"),
    body("perfil").notEmpty().withMessage("Tienes que elegir el perfil de usuario"),
    body("interes").notEmpty().withMessage("Tienes que elegir tus intereses"),
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

