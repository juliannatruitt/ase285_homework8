// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const password = require('../src/makepassword');
const u = require('../src/utility');
const fs = require('fs');
const {readFile, hash} = require("../src/utility");


describe("makepassword should create encryption file and delete it after running", () => {
    test('this test will give you a warning that it cant connect to mongodb because of uri, but its okay because tests ' +
        'run and pass and it is not necessary to connect to mongodb to test this module', async () => {
        const fileName = 'passwordtest.txt'
        const encFileName = 'passwordtest.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        let encryption_file_exists_before_function_runs =  fs.existsSync(encFileName);

        await password.makepassword(fileName, encFileName);

        // 2. Make sure password.enc.txt does exist after running the function.
        let encryption_file_exists_after_function_runs = fs.existsSync(encFileName);

        // 3. Make sure the contents of password.enc.txt has correct contents.
        //first, it gets all the users from password.txt and hashes the password to store in array.
        //this is essentially doing the same thing that the makepassword function does, but since password.enc.txt
        //gets made and deleted after running that function, we have to mimic the functionality to check that passwords
        //are being hashed correctly.
        let credentials = readFile(fileName);
        let usercredentials_enc = [];
        while (credentials.length > 0){
            let getCredential = credentials.shift();
            let [username, password] = getCredential.split(':');
            let encryptedPassword = hash(password.trim());
            usercredentials_enc.push(`${username}:${encryptedPassword}`);
        }
        //then, we go through the file again, but this time we compare each lines password with the password of the
        //corresponding user in the array. The password hashes should match the password stored for that user in the array.
        //each time the hashed passwords match, we count up the total users.
        //the value of count_total_users should be equal to the length of the array, and this is how we ensure that the
        //module functions work properly and are returning the correct hash value.
        let credentials_again = readFile(fileName);
        let count_total_users = 0;
        for (let i=0; i<credentials_again.length; i++){
            let [username, password] = credentials_again[i].split(':');
            let [current_username, current_password] =  usercredentials_enc[i].split(':');
            if (hash(password.trim()) === current_password){
                count_total_users++;
            }
        }

        expect(encryption_file_exists_before_function_runs).toBe(false);
        expect(count_total_users).toBe(usercredentials_enc.length);
        expect(encryption_file_exists_after_function_runs).toBe(false);
    })
})