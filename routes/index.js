const express = require('express');

const router = express.Router();
const homeController = require('../controller/homecontroller')



router.get('/', homeController.home );
router.get('/home2',homeController.home2)
router.use('/users',require('./users'))



module.exports = router;