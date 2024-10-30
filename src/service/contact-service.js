import { prismaClient } from "../application/database";
import { createContactValidation } from '../validation/contact-validation';
import { validate } from "../validation/validation";

const create = async (user, request) => {
   const contact = validate(createContactValidation, request);
   contact.username = user.username
   console.log(contact)


   return prismaClient.contact.create({
    data:contact,
    select : {
        id : true,
        last_name: true,
        first_name:true,
        email : true,
        phone: true
    }
   })

};





export default {
    create
};
