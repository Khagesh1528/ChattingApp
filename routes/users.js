const express = require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../controller/userscontroller')

router.get('/sign-up',userController.signUp);
router.post('/create',userController.create)
router.get('/chatbox',userController.chatBox);
router.get('/forgot_password',userController.forgotPassword)
router.post('/forgot',userController.forgot);
router.get('/reset/:token',userController.updatePassword);
router.post('/reset', userController.resetPassword);
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/' },
), userController.createSession);

router.get('/sign-out',userController.destroySession)




// router.get('/forgot_password', usersController.forgotPassword)
// router.get('/reset/:token', usersController.updatePassword);
// router.post('/forgot', usersController.forgot)
// router.post('/reset', usersController.resetPassword);


module.exports = router;