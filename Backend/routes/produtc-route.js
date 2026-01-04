import { Router } from 'express';
import { auth } from "../middleware/auth-middleware.js";
import { AddProductController, deleteProductController, getProductController, updateProductController } from '../controllers/getProductController.js';


const productRouter = Router();

productRouter.post('/add-product', auth, AddProductController);

productRouter.get('/get', getProductController);

productRouter.put('/update', auth, updateProductController);

productRouter.delete('/delete', auth, deleteProductController);

export default productRouter;
