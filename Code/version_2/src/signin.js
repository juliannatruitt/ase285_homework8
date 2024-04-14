'use strict'
const util = require('./utility')

async function signin(email, password, passwordFile){
    let allUserEmails = [];
    let readAllUsers = util.readFile(passwordFile);
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