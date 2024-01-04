const faker = require("faker");
const setUpDB = require("../utils/setUpTestDB");
const Account = require("../../src/models/accounts.model");



setUpDB()

describe('Account model',() => {

    let user;
    let newUser

    beforeAll(async () => {
        //creates the table if it doesnt exist
        newUser = {
            email: faker.internet.email().toLowerCase(),
            password: "123@QWEasd1249587(*2-1(&&%$#!@#$%^&:™£₹§ˆ¶•",
            role: 30530,
            userName: faker.name.findName(),
            phoneNumber: "1234567890"
        }
        try{
            await Account.sync({alter: true})
        }catch(er){
            console.log(er)
        }
    })

    beforeEach(() => {
        user = {
            email: faker.internet.email().toLowerCase(),
            password: "123@QWEasd1249587(*2-1(&&%$#!@#$%^&:™£₹§ˆ¶•",
            role: 6,
            userName: faker.name.findName(),
            phoneNumber: "1234567890"
        }
    })

    test("should be able to insert valid account instance", async () => {
            let account = await Account.create(newUser)
            expect(account instanceof Account).toBeTruthy()
    })
    
    test("check if inserted account can be queried", async () => {
        let accounts = await Account.findAll({
            where: {
                userName: newUser.userName
            }
        })
        expect(accounts.length).toEqual(1)
        expect(accounts[0] instanceof Account).toBe(true)
    })

    describe('model constraint and validator tests',() => {
        test('testing password complexity check for absence of special character',
        async () => {
            user.password = "123Qweasdnvak"
            await expect(Account.create(user)).rejects.toThrow()
        })
        test('testing password length check',
        async () => {
            user.password = "123@Qw"
            await expect(Account.create(user)).rejects.toThrow()
        })

        test('testing if invalid email throws validation error', async () => {
            user.password = "123@QWEasd1249587(*2-1(&&%$#!@#$%^&:™£₹§ˆ¶•"
            user.email = "someinvalidemail"
            await expect(Account.create(user)).rejects.toThrow("Validation isEmail on email failed")
        })
    })
})