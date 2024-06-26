'use strict'
const fs = require('fs');
const util = require('./utility')

async function signin(email, password){
    let allUserEmails = [];
    let readAllUsers = util.readFile('./data/password.txt');
    while (readAllUsers.length > 0){
        let currentUser = readAllUsers.shift();
        let username = currentUser.split(':')[0];
        allUserEmails.push(username);
    }
    if(allUserEmails.includes(email)){
        return await util.readFromMongoose(email, password);
    }
    return false;
}
module.exports = {signin};