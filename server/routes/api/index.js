const express = require ("express"); 

const userRoutes = require ("./user"); 
const generateRoutes = require ("./generate");
const curriculumRoutes = require ("./curriculum");

const router = express.Router (); 

router.use ("/user", userRoutes); 
router.use ("/generate", generateRoutes) // generating qs given template, syllabus, etc
router.use ("/curriculum", curriculumRoutes); // creating curriculum

module.exports = router; 