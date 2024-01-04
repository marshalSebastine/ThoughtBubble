const request = require("supertest");
const app = require("../../src/app");
const setUpTestDB = require("../utils/setUpTestDB");


setUpTestDB()


describe("Auth routes", () => {

    describe("POST /auth/login", () => {

        test("should respond with 422 error code if request body has missing fields", async () => {

            const resp = await request(app).post('/auth/login')
            expect(resp.statusCode).toBe(422);
        })

        test("should respond with 422 error code if request body has wrong type of field value", async () => {

            const resp = (await request(app).post('/auth/login').send({email: 123,password: 123}))
            expect(resp.statusCode).toBe(422);
        })

        test("invalid email provided", async () => {

            const resp = (await request(app).post('/auth/login').send({email: "alertyq82734",password: 23}))
            expect(resp.statusCode).toBe(422);
        })

        test("given mail id that is not registered", async() => {
            const resp = (await request(app).post('/auth/login').send({email: "some@gmail.com",password: "somepass"}))
            expect(resp.statusCode.toBe(401))
        })

        //set beforeEach closure
        // test("should respond with 200 code and respond with xcsrf token and set cookie if request data is ok",
        //     async () => {
        //         const resp = await request(app).post('/auth/login')
        //         expect(resp.statusCode).toBe(200);
        //     })
    })
})

