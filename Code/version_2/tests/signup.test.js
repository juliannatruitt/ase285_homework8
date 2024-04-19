const {signup} = require('../src/signup.js');

describe('signup with a user who has not been made yet should work', () => {
    test('this test will only pass once since the user will be created after running test', async () => {

        let email = 'newuser101@yahoo.com';
        let password = 'NewUserPassword45!';
        let passwordFile = './passwordtest.txt';
        let encPasswordFile = './passwordtest.enc.txt';
        let response = await signup(email,password,passwordFile,encPasswordFile);

        expect(response).toBe("User Account Made!");
    })
});

describe('signup with an already existing user will not work', () => {
    test('user is already signed up so it should return a message saying that', async () => {

        let email = 'newuser101@yahoo.com';
        let password = 'NewUserPassword45!';
        let passwordFile = './passwordtest.txt';
        let encPasswordFile = './passwordtest.enc.txt';
        let response = await signup(email,password,passwordFile,encPasswordFile);

        expect(response).toBe("User with this email already created, log in or choose another email to signup with.");
    })
});