
import supertest from "supertest";
import { web } from "../src/application/web";
import { removeAllTestContact, removeTestUser, createTestUser, getTestUser, createTestContact, getTestContact} from "../test/test-util"
import { text } from "express";

describe('POST /api/contacts', function () {

    beforeEach(async () => {
        await createTestUser();
    })


    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should new a contact', async () => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            first_name: "test",
            last_name: "test",
            email: "test@gmail.com",
            phone: "08"
        });



        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("08");
    })
    
});

describe('GET /api/contacts', function () {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })


    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser()
    })
    it('should get all contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .get('/api/contacts/' + testContact.id)
        .set('Authorization', 'test');
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
  
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    })
})



describe('PUT /api/contacts/:contactId', function () {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })


    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser()
    })


    it('should update a contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id)
        .set('Authorization', 'test')
        .send({
            first_name: "azmi",
            last_name: "azmi",
            email: "azmi@gmail.com",
            phone: "088"
        });
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("azmi");
        expect(result.body.data.last_name).toBe("azmi");
        expect(result.body.data.email).toBe("azmi@gmail.com");
        expect(result.body.data.phone).toBe("088");
        
    })
})


describe('DELETE /api/contacts/:contactId', function () {
    
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })


    afterEach(async () => {
        await removeAllTestContact();
        await removeTestUser()
    })


    it('should delete a contact', async () => {
        let testContact = await getTestContact()
        const result = await supertest(web)
        .delete('/api/contacts/' + testContact.id)
        .set('Authorization', 'test');
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK")
        testContact = await getTestContact()
        expect(testContact).toBeNull()
    })
})