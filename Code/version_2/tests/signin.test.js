const {signin} = require('../src/signin');

describe('make sure signing in with valid credentials works', () => {
    test('', async () => {

        let email = 'sallyshortcake@gmail.com';
        let password = 'ThisisStrong!';
        let passwordFile = './passwordtest.txt'

        expect(await signin(email, password, passwordFile)).toBe(true);
    })
});

describe('make sure signing in with invalid password does not work', () => {
    test('', async () => {

        let email = 'sallyshortcake@gmail.com';
        let password = 'WrongPassword!';
        let passwordFile = './passwordtest.txt'

        expect(await signin(email, password, passwordFile)).toBe(false);
    })
});

describe('make sure signing in with invalid username does not work', () => {
    test('', async () => {

        let email = 'userWhoDoesntExist@gmail.com';
        let password = 'ThisisStrong!';
        let passwordFile = './passwordtest.txt'

        expect(await signin(email, password, passwordFile)).toBe(false);
    })
});