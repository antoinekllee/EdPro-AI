const express = require ("express"); 
const controller = require ("../../controllers/generate"); 

const router = express.Router (); 

router.post ("/mentorReport", controller.mentorReport); 
router.post ("/mindmap", controller.mindmap);
router.post ("/curriculum", controller.curriculum);

module.exports = router; 