const express = require ("express"); 

const userRoutes = require ("./user"); 
const generateRoutes = require ("./generate");

const router = express.Router (); 

router.use ("/user", userRoutes); 
router.use ("/generate", generateRoutes) // generating qs given template, syllabus, etc

module.exports = router; 