const express = require ("express"); 
const controller = require ("../../controllers/curriculum"); 

const router = express.Router (); 

router.get ("/", controller.getCurriculums);
router.get ("/getById/:id", controller.getCurriculumById);
router.post ("/new", controller.newCurriculum); 
router.post ("/update-lesson", controller.updateLesson);
router.get ("/lesson/:id", controller.getLessonById);

module.exports = router; 