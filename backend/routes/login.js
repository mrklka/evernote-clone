const router = require('express').Router()
const userController = require('../controllers/userController')

//Register
router.route('/new').post(userController.register)

//Login
router.route('/auth').post( userController.login)

router.route('authenticate').get( userController.checkJWT)


module.exports = router