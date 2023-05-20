const path = require('path');
const express = require('express');
const  shopController = require('../controllers/shop');
const  router = express.Router();


router.get('/',shopController.getIndex);
router.get('/product',shopController.getProducts);

router.get('/product-detail/:productId',shopController.getDetailProduct);



router.get('/contact',shopController.getContact);
router.get('/blog',shopController.getBlog);
router.get('/about',shopController.getAbout);
router.get('/cart',shopController.getCart);
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.post('/create-order',shopController.postCartOrder);

router.get('/orders',shopController.getCartOrder);

module.exports  = router;