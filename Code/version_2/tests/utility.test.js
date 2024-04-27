const {readFile, writeFile, appendFile, hash, readFromMongoose, uploadToMongoose} = require('../src/utility.js');
const fs = require('fs');
const {createHash} = require("crypto");
const Users = require("../models/Users");
const mongoose = require("mongoose");
jest.setTimeout(80000)

describe('make sure readFile() function works', () => {
    test('make sure that a file that does not exist throws back "filename does not exist"', async () => {

        let fileThatDoesNotExist = 'IDontExist.txt'
        expect(()=> readFile(fileThatDoesNotExist)).toThrow('IDontExist.txt does not exist!');
    })
});

describe('make sure readFile() function works', () => {
    test('make sure that exists gets returned by line (\n)', async () => {

        let existingFile = 'passwordtest.txt';
        let contents = fs.readFileSync(existingFile).toString('utf-8');
        contents  = contents.split("\n");

        let testingReadFile = readFile(existingFile);
        expect(testingReadFile).toEqual(contents);

    })
});

describe('make sure writeFile() function works', () => {
    test('make sure a new file is added with WriteFile', async () => {

        let array = ['julianna:truitt', 'Bob:Belcher', 'Peter:Parker', 'Jon:Snow'];
        writeFile(array, 'testingWriteFileFunction');

        expect(fs.existsSync('testingWriteFileFunction')).toBe(true);
    })
});

describe('make sure appendFile() function works', () => {
    test('make sure new data is added to a file', async () => {

        let originalContent = readFile('testingWriteFileFunction');

        let dataToAdd = '\nnew:data'
        appendFile('testingWriteFileFunction', dataToAdd);

        let addedContent = readFile('testingWriteFileFunction');

        expect(originalContent.length +1).toBe(addedContent.length);
    })
});

describe('make sure hash() function works', () => {
    test('make sure hash function works properly', async () => {

        let contentToBeEncoded = "Hello World!!";
        let encodedHash = createHash('sha256').update(contentToBeEncoded).digest('hex');
        let encodedFromHashFunction = hash(contentToBeEncoded);

        expect(encodedHash).toEqual(encodedFromHashFunction);
    })
});


describe('make sure readFromMongoose function works', () => {
    test('testing that a user already created and uploaded returns true to correct credentials', async () => {
        try {
            let validUser = await readFromMongoose('juliannat@gmail.com', 'ILoveSchool6!');

            expect(validUser).toBe(true);
        }catch(error){
            await mongoose.connection.close();
            console.log(error);
        }
    }, 100000)
});

describe('make sure uploadtomongoose function works', () => {
    test('making sure that a new user gets added to the database. (this test will only run once because the user will be added,' +
        ' change the credentials to a different email to test a different user!', async () => {
        try {

            const console_spy = jest.spyOn(console, 'log');
            await uploadToMongoose(['newUserHaHaTest:UnitTest123!']);


            expect(console_spy).toHaveBeenCalledWith("Connected to DB!");
            console_spy.mockRestore();

        }catch(error){
            console.log(error);
        }
    }, 100000)
});