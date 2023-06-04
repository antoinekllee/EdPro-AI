const express = require ("express"); 
const controller = require ("../../../controllers/user"); 

const router = express.Router (); 

router.get ("/", controller.getUser)
router.post ("/login", controller.login); 
router.post ("/new", controller.newUser); 
router.get ("/logout", controller.logout); 

module.exports = router; 