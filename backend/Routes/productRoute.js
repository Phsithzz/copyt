import express from 'express'
import * as productController from '../Controllers/productController.js'
const router = express.Router()

router.get('/products',productController.getAllProduct)
router.get('/products/three',productController.getThreeProduct)
router.get('/products/:id',productController.getProductById)
router.get('/products/brands/:id',productController.getProductByBrandId)
router.post('/products',productController.postProduct)
router.put('/products/:id',productController.putProduct)
router.delete('/products/:id',productController.deleteProduct)
export default router