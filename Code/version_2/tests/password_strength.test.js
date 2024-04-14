const {password_strength} = require('../src/password_strength');

describe('makes sure that a strong password gets returned true', () => {
    test('A password is considered strong if it has a capital letter, a special character, and is at least ' +
        '8 characters long.', () => {
        let strong_password = 'ThisIsAStrongPassword!';
        let another_strong_password = 'str@wberryMilkshake';
        let yet_another_strong_password = 'Softwareengineering123!'

        expect(password_strength(strong_password)).toBe(true);
        expect(password_strength(another_strong_password)).toBe(true);
        expect(password_strength(yet_another_strong_password)).toBe(true);
    })
});

describe('makes sure that a weak password gets returned false', () => {
    test('A password is considered strong if it has a capital letter, a special character, and is at least ' +
        '8 characters long.', () => {
        let weak_password = 'thisisnotastongpassword';
        let another_weak_password = 'alsoAWeakPassword';
        let yet_weak_strong_password = '123456!'

        expect(password_strength(weak_password)).toBe(false);
        expect(password_strength(another_weak_password)).toBe(false);
        expect(password_strength(yet_weak_strong_password)).toBe(false);
    })
});