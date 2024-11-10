import express from "express"
import userController from "../controller/user-controller"
import contactController from "../controller/contact-controller"
import addressController from "../controller/address-controller"
import { authMiddleware } from "../middleware/auth-middleware"

const userRouter = new express.Router()
userRouter.use(authMiddleware)

userRouter.get("/api/users/current", userController.get)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)


// contact router
userRouter.post('/api/contacts', contactController.create)
userRouter.get('/api/contacts/:contactId', contactController.get)
userRouter.put('/api/contacts/:contactId', contactController.update)
userRouter.delete('/api/contacts/:contactId', contactController.remove)
userRouter.get('/api/contacts', contactController.seacrh)



// address router
userRouter.post('/api/contacts/:contactId/addresses', addressController.create)
userRouter.get('/api/contacts/:contactId/addresses/:addressId', addressController.get)
export {
    userRouter, 
}



