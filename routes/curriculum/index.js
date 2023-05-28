const express = require ("express"); 
const controller = require ("../../controllers/curriculum"); 

const router = express.Router (); 

router.get ("/", controller.getCurriculums);
router.post ("/new", controller.newCurriculum); 

module.exports = router; 