import { validate } from "../validation/validation";
import {loginUserValidation, registerUserValidation, getUserValidation } from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import { request } from "express";
import {v4 as uuid} from "uuid"
import { valid } from "joi";


const register = async (request) => {
    // Validasi input
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: { username: user.username }
    });
    
    if (countUser === 1) { // Cek apakah username sudah ada
        throw new ResponseError(400, "Username already");
    }
    user.password = await bcrypt.hash(user.password, 10); // Menambahkan await di sini
    
    // Buat user baru
    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    });
};


const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findUnique({
        where : {
            username: loginRequest.username
        },
        select : {
            username : true,
            password : true
        }
    })

    if(!user) {
        throw new ResponseError(401, "Username OR password wrong");
    }


    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordValid) {
        throw new ResponseError(401, "Username OR password wrong");
    }
    
    const token = uuid().toString();
   
    return prismaClient.user.update({
        data : {
            token : token
        },
        where : {
            username : user.username
        },
        select : {
            token : true
        }
    })



}
const get = async (username) => {
    username = validate(getUserValidation, username)
    const user = await prismaClient.user.findUnique({
        where : {
            username : username
        },
        select : {
            username : true,
            name : true
        }
    })

    if(!user) {
        throw new ResponseError(404, 'user is not found')
    }


    return user

}


export default {
    register,
    login,
    get
};


