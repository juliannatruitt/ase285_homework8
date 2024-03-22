'use strict'
const fs = require('fs');
const util = require('./utility')
const {makepassword} = require('./makepassword.js');
const {readFromMongoose} = require("./utility");

async function passwordjs() {
    if (process.argv.length != 4) return 'false';

    var email = process.argv[2]
    var password = process.argv[3]

    let readAllUsers = util.readFile('./password.txt');
    while (readAllUsers.length > 0){
        let currentUser = readAllUsers.shift();
        let username = currentUser.split(':')[0];
        if (username === email){
            return await util.readFromMongoose(email, password);
        }
    }
    util.appendFile('./password.txt', `\n${email}:${password}`);
    await makepassword('./password.txt', './password.enc.txt');
}
async function main(){
    console.log(await passwordjs());
}
main();
