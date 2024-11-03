import { web } from "../src/application/web"
import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, getTestUser, removeAllTextContacts, removeTestUser } from "./test-util"


describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTextContacts();
        await removeTestUser();
    });

    

    it('should create a new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                phone: "08"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@gmail.com");
        expect(result.body.data.phone).toBe("08");
    });


    it('should reject request valid', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test@gmail.com",
                phone: "0000000000000000000000000000008"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});



describe('GET /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact()
    })


    afterEach(async () => {
        await removeAllTextContacts();
        await removeTestUser()
        
    })


    it('should get all contacts', async () => {
        const testContact = await getTestContact();
        const result = await supertest(web)
              .get('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')  // Replace 'test' with the actual token or method if needed

        expect(result.status).toBe(200);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });
})