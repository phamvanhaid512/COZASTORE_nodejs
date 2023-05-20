const path = require('path');
const express = require('express');
const fs = require("fs");
const multer  = require('multer');
const  sliderController = require('../controllers/slider');
const  router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.get('/slider',sliderController.getAddSlider);
router.get('/list-slider', sliderController.getListSlider);


router.post('/addslider', upload.single('imageUrl'),sliderController.postAddSlider);

router.get('/editslider/:productId',sliderController.getEditSlider);



module.exports  = router;