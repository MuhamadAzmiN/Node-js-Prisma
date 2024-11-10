import supertest from "supertest"
import { createTestContact, createTestUser, removeAllTestAddress, getTestContact, removeAllTestContact, removeTestUser, createTestAddress, getTestAddress } from "./test-util"
import { web } from "../src/application/web"
import logger from "../src/application/logging"

describe('POST /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })


    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact();
        await removeTestUser()
    })

    it('should can create address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/addresses')
            .set('Authorization', 'test')
            .send({
                street : "jalan test",
                city : 'kota test',
                province : 'provinsi test',
                country : 'indonesia',
                postal_code : '12345',
                
            });


        console.log(result.body)

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("12345");

        
    })
})



describe('GET /api/contacts/:contactId/addresses', function () {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })


    afterEach(async () => {
        await removeAllTestAddress();
        await removeAllTestContact();
        await removeTestUser()
    })
    

    it('should get all address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
        .get('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
        .set('Authorization', 'test');

        // logger.info(result.body)
        console.log(result.body)
        console.log(result.status)


        
        expect(result.status).toBe(200);
        // expect(result.body.data.length).toBe(1);
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("12345");
    })


    
})



describe('PUT /api/contacts/:contactId/addresses/:addressId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })


    afterEach(async () => {
        await removeAllTestAddress();
        await removeAllTestContact();
        await removeTestUser()
    })


    it('should update a address', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        const result = await supertest(web)
        .put('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
        .set('Authorization', 'test')
        .send({
            street : "jalan test",
            city : 'kota test',
            province : 'provinsi test',
            country : 'indonesia',
            postal_code : '12345',
            
        });
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testAddress.id);
        expect(result.body.data.street).toBe("jalan test");
        expect(result.body.data.city).toBe("kota test");
        expect(result.body.data.province).toBe("provinsi test");
        expect(result.body.data.country).toBe("indonesia");
        expect(result.body.data.postal_code).toBe("12345");

    
    })
    
})




describe('DELETE /api/contacts/:contactId/addresses/:addressId', function () {

    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })


    afterEach(async () => {
        await removeAllTestAddress();
        await removeAllTestContact();
        await removeTestUser()
    })
    it('should delete a address', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()
        const result = await supertest(web)
        .delete('/api/contacts/' + testContact.id + '/addresses/' + testAddress.id)
        .set('Authorization', 'test');
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK")

        testAddress = await getTestAddress()
        expect(testAddress).toBeNull()
    })
})




describe('GET /api/contacts/:contactId/addresses', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
        await createTestAddress();
    })


    afterEach(async () => {
        await removeAllTestAddress();
        await removeAllTestContact();
        await removeTestUser()
    })

    it('should get all address', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
        .get('/api/contacts/' + testContact.id + '/addresses')
        .set('Authorization', 'test');
        console.log(result.body)
        console.log(result.status)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    })
})