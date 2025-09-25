import express from 'express'
import * as cartController from '../Controllers/cartController.js'
const router = express.Router();

router.post('/carts/chkcart',cartController.chkCart)
router.post('/carts/addcart',cartController.postCart)
router.post('/carts/addcartdtl',cartController.postCartDtl)

export default router