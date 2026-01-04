import  { Router } from 'express'
import { auth } from "../middleware/auth-middleware.js";
import { AddCategoryControllerr, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const categoryRouter = Router()

categoryRouter.post('/add-category',auth,AddCategoryControllerr)
categoryRouter.get('/get',getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete('/delete',auth,deleteCategoryController)

export default categoryRouter