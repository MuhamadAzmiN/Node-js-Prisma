import userService from "../service/user-service.js";


// src/controller/user-controller.js
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - name
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */


const register = async (req, res, next) => {
    try {
        // validate(registerUserValidation, req.body);
        const result = await userService.register(req.body);
        console.log(result)
        console.log(req.body)
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e); 
    }
};


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Login a user with the provided credentials and return a UUID token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully and UUID token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the login.
 *                 token:
 *                   type: string
 *                   format: uuid 
 *                   description: The UUID token to authenticate the user for further requests. 
 *                   
 *       400:
 *         description: Invalid credentials, either username or password is incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error, occurs when an unexpected error happens on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */


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

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user information
 *     description: Returns information about the currently authenticated user.
 *     security:
 *       - bearerAuth: []  # Bearer Authentication (UUID token)
 *     responses:
 *       200:
 *         description: Successfully retrieved the current user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                 token:
 *                   type: string
 *                   description: The authentication token of the user (optional)
 *       401:
 *         description: Unauthorized. No valid authentication token was provided.
 *       404:
 *         description: User not found. The provided token does not match any user.
 *       500:
 *         description: Internal Server Error.
 */



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



const update = async (req,res,next) => {
    try {
        const username = req.user.username
        const request = req.body
        request.username = username

        const result = await userService.update(request)
        res.status(200).json({
            data : result
        })
    }catch(e){
        next(e)
    }
}



const logout = async (req, res,next) => {
    try {
        await userService.logout(req.user.username)
        res.status(200).json({
            data : "OK"
        })
    }catch(e) {
        next(e)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
    
};







