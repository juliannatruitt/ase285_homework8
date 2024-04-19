'use strict'
const util = require('./utility')
const {makepassword} = require('./makepassword.js');
const {password_strength} = require('./password_strength');

async function signup(email, password, fileName, encryptedFileName){
    let allUserEmails = [];
    let readAllUsers = util.readFile(fileName);
    while (readAllUsers.length > 0){
        let currentUser = readAllUsers.shift();
        let username = currentUser.split(':')[0];
        allUserEmails.push(username);
    }
    if(allUserEmails.includes(email)){
        return "User with this email already created, log in or choose another email to signup with.";
    }
    let password_is_strong_enough = password_strength(password);
    if (password_is_strong_enough) {
        util.appendFile(fileName, `\n${email}:${password}`);
        await makepassword(fileName, encryptedFileName);
        return "User Account Made!";
    }
    else{
        return "password is not strong enough. It must contain at least 1 capital letter, 1 special character, and" +
            " be at least 8 characters long.";
    }
}
module.exports = {signup};