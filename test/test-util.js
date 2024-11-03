import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
export const removeTestUser = async () => {
    return prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    });
}

export const createTestUser = async () => {
    await  prismaClient.user.create({
        data : {
            username : "test",
            name : "test",
            password : await bcrypt.hash("rahasia", 10),
            token : "test"
        }
    })
}




export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTextContacts = async () => {
     await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    });
}




export const createTestContact = async () => {
    return  prismaClient.contact.create({
        data : {
            username : "test",
            first_name : "test",
            last_name : "test",
            email : "test@gmail",
            phone : "08"
        }
    })
}



export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    });
}