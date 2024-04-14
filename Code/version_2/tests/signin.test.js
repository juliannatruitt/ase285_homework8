const {signin} = require('../src/signin');

describe('make sure signing in with valid credentials works', () => {
    test('', async () => {

        let email = 'sallyshortcake@gmail.com';
        let password = 'ThisisStrong!';
        let passwordFile = './passwordtest.txt'

        expect(await signin(email, password, passwordFile)).toBe(true);
    })
});