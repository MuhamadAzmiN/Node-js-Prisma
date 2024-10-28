import userService from "../service/user-service";
import { validate } from "../validation/validation"; // Import validasi jika ada
import { registerUserValidation } from "../validation/user-validation"; // Import schema validasi

const register = async (req, res, next) => {
    try {
        // validate(registerUserValidation, req.body);
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e); 
    }
};


const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e); 
    }
};

const get = async (req, res, next) => {
   try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data: result
        })
   }catch(e) {
        next(e)
   }
};

export default {
    register,
    login,
    get
};







