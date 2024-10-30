import { web } from "../src/application/web"
import supertest from "supertest"
import { createTestUser, removeAllTextContacts, removeTestUser } from "./test-util"


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
            .set('Authorization', 'test')  // Replace 'test' with the actual token or method if needed
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@gmail.com",
                phone: "08"
            });

        expect(result.status).toBe(200);
        expect(result.body.data?.id).toBeDefined();
        expect(result.body.data?.first_name).toBe("test");
        expect(result.body.data?.last_name).toBe("test");
        expect(result.body.data?.email).toBe("test@gmail.com");
        expect(result.body.data?.phone).toBe("08");
    });
});

