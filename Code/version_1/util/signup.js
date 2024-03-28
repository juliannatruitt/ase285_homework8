'use strict'
const fs = require('fs');
const util = require('./utility')
const {makepassword} = require('./makepassword.js');

async function signup(email, password){
    let allUserEmails = [];
    let readAllUsers = util.readFile('./data/password.txt');
    while (readAllUsers.length > 0){
        let currentUser = readAllUsers.shift();
        let username = currentUser.split(':')[0];
        allUserEmails.push(username);
    }
    if(allUserEmails.includes(email)){
        return console.log("User with this email already created, log in or choose another email to signup with.");
    }
    util.appendFile('./data/password.txt', `\n${email}:${password}`);
    await makepassword('./data/password.txt', './data/password.enc.txt');
    return console.log("User Account Made!");
}
module.exports = {signup};