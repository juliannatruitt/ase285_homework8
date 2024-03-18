'use strict'
const fs = require('fs');
const util = require('./utility')
const {makepassword} = require('./makepassword.js');
const {readFromMongoose} = require("./utility");

async function passwordjs() {
    if (process.argv.length != 4) return 'false';

    //var filename = process.argv[2]
    var email = process.argv[2]
    var password = process.argv[3]

    let readAllUsers = util.readFile('./password.txt');
    while (readAllUsers.length > 0){
        let currentUser = readAllUsers.shift();
        let username = currentUser.split(':')[0];
        if (username === email){
            console.log(await util.readFromMongoose(email, password));
            break; // fix this?? maybe
        }
    }
    //fs.appendFileSync('./password.txt', `${email}:${password}`);
    //makepassword('./password.txt', './password.enc.txt');
}
passwordjs();
//let usersArray = util.readFile('password.enc.txt');
//util.uploadToMongoose(usersArray);

//console.log(readFromMongoose("john.deacon@good.com", "bestpassword"));
////if (require.main === module) {
//    console.log(passwordjs()) // print out true or false
//}
//
//module.exports = {???};