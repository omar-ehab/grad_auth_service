const router = require('express').Router();

const controller = require('../controllers/AuthController');

const { verifyAccessToken } = require('../helpers/jwt_helper');

router.post('/student/login', controller.student_login);
router.post('/student/refresh', controller.student_refresh);
router.post('/student/logout', verifyAccessToken, controller.student_logout);


router.post('/teacher/login', controller.teacher_login);
router.post('/teacher/refresh', controller.teacher_refresh);
router.post('/teacher/logout', verifyAccessToken, controller.teacher_logout);

module.exports = router;