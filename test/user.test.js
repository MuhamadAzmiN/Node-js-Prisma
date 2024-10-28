import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { removeTestUser,createTestUser } from "./test-util.js";
import {looger} from "../src/application/logging.js";


describe('POST /api/users', function () {
    
    afterEach(async () => {
        await removeTestUser();
    });

    it('should return status 200', async () => {
        const result = await supertest(web).post('/api/users').send({
            username: "test",
            password: "rahasia",
            name: "test"
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject invalid data and return status 400', async () => {
        const result = await supertest(web).post('/api/users').send({
            username: "",
            password: "",
            name: ""
        });
        
        // logger.info("Response Body:", result.body); 
        expect(result.status).toBe(400);
        // console.log(result.body.errors)
        
        expect(result.body.errors).toBeDefined(); // Pastikan ini sesuai dengan respons Anda
    });



    it('should reject duplicate username already exist', async () => {
        // Pertama, daftarkan pengguna
        let result = await supertest(web).post('/api/users').send({
            username: "test",
            password: "rahasia",
            name: "test"
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post('/api/users').send({
            username: "test",
            password: "rahasia",
            name: "test"
        });
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        console.log(result.body.errors)
    });
    
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();

    })

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web).post('/api/users/login').send({
            username: "test",
            password: "rahasia"
        });
        console.log("Result body:", result.body);
        console.log("Result status:", result.status);
    
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

})


describe('GET /api/users/current', function () {
beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    });


    it('should can get current user', async () => {
        const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');
        console.log("Result body:", result.body);
        console.log("Result status:", result.status);
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
    });

})