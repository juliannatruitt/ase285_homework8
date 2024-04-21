const {readFile, writeFile, appendFile, hash, readFromMongoose} = require('../src/utility.js');
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

            let validUser = readFromMongoose('juls8885@gmail.com', '12345677');

            expect(validUser).toEqual(true);
        }catch(error){
            await mongoose.connection.close();
            console.log(error);
        }
    }, 100000)
});