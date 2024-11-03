
import contactService from "../service/contact-service"
const create = async(req,res,next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactService.create(user, request)

        res.status(200).json({
            data : result
        })
        
    } catch (e) {
        next(e) 
    }
}


const get = async (req,res,next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        console.log(contactId) 
        const result = await contactService.get(user, contactId)
        res.status(200).json({
            data : result
        })
    } catch (e) {
        next(e) 
    }
}




const update = async(req,res,next) => {
    try {
        const user = req.user // ini untuk user yang sedang login
        const contactId = req.params.contactId // ini untuk contact id yang ingin di update
        const request = req.body // ini untuk data yang ingin di update 
        request.id = contactId // ini untuk contact id yang ingin di update
        const result = await contactService.update(user, request)
        res.status(200).json({
            data : result
        })

    }catch (e) {
        next(e) 
    }
}

export default {
    create,
    get,
    update

}