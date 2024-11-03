import { Joi } from "joi";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { createContactValidation, getContactValidation, updateContactValidation } from '../validation/contact-validation';
import { validate } from "../validation/validation";
import { updateUserValidation } from "../validation/user-validation";

const create = async (user, request) => {
   const contact = validate(createContactValidation, request);
   contact.username = user.username
   console.log(contact)


   return prismaClient.contact.create({
    data : contact,
    select : {
        id : true,
        last_name: true,
        first_name:true,
        email : true,
        phone: true
    }
   })

};



const get = async (user,contactId) => {
    contactId = validate(getContactValidation, contactId);
    const contact = await prismaClient.contact.findFirst({
        where : {
            username : user.username,
            id : contactId
        },
        select : {
            id : true,
            first_name : true,
            last_name : true,
            email : true,
            phone : true
        }
    })

    console.log(contact)

    if(!contact){
        throw new ResponseError(404, 'contact is nout found')
    }


    return contact
}


const update = async (user,request) => {
    const contact = validate(updateContactValidation, request);
    const totalContactInDatabase = await prismaClient.contact.count({
        where : {
            username : user.username,
            id : contact.id
        }
    }) 

    if(totalContactInDatabase !== 1){
        throw new ResponseError(404, 'contact is nout found')
    }

    return prismaClient.contact.update({
        where : {
            id : contact.id
        },
        data : {
            first_name : contact.first_name,
            last_name : contact.last_name,
            email : contact.email,
            phone : contact.phone
        },
        select : {
            id : true,
            first_name : true,
            last_name : true,
            email : true,
            phone : true
        }
    })



}
export default {
    create,
    get,
    update
};
