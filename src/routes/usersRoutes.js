const express = require("express")
const router = express()


const usersController = require("../controllers/usersController")

const uploadFile = require("../middlewares/multerMiddleware")
const validations = require("../middlewares/validationRegisterMiddleware")

router.get("/register",usersController.registro)
router.post("/register",uploadFile.single("image"),validations,usersController.store)
router.get("/login",usersController.ingreso)
router.get("/profile",usersController.perfil)


module.exports = router;