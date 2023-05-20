const path =  require('path');
const express = require('express');
const adminController=  require('../controllers/admin');
const fs = require("fs");
const multer  = require('multer');
const router = express.Router();
const isAuth  = require('../middleware/is-auth.js')


router.get('/dashboard',isAuth);

router.get('/add-product',isAuth,adminController.getAddProducts);


const upload = multer({ dest: 'uploads/' });
router.post('/add-product',upload.single('imageUrl'),adminController.postAddProducts);
router.get('/edit-product/:productId',isAuth,adminController.getEditProduct);
router.post('/edit-product',upload.single('imageUrl'),adminController.postEditProduct);


router.get('/list-product',isAuth,adminController.getListProducts);
router.post('/delete-product',adminController.postDeleteProduct);


module.exports = router;