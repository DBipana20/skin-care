import express from 'express';
import {
  getProducts,
  getProductById,
  toggleProductFavorite,
  addProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id/favorite', toggleProductFavorite);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

export default router;
