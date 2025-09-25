import express from 'express'
import * as cartController from '../Controllers/cartController.js'
const router = express.Router();

router.post('/carts/chkcart',cartController.chkCart)
router.post('/carts/addcart',cartController.postCart)
router.post('/carts/addcartdtl',cartController.postCartDtl)
router.post('/carts/getcartbycus',cartController.getCartByCus)
router.get('/carts/sumcart/:id',cartController.sumCart)
router.get('/carts/getcart/:id',cartController.getCart)
router.get('/carts/getcartdtl/:id',cartController.getCartDtl)

export default router