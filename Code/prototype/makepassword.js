'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility');
const Users = require("./models/Users.js");

function makepassword(passwordFileName, encryptedPasswordFileName) {
   let credentials = readFile(passwordFileName);
   let encCredentials = [];
   while (credentials.length > 0){
       let getCredential = credentials.shift();
       let [username, password] = getCredential.split(':');
       let encryptedPassword = hash(password);
       encCredentials.push(`${username}:${encryptedPassword}`);
   }
   writeFile(encCredentials, encryptedPasswordFileName);

}
//makepassword('./password.txt', './password.enc.txt');

//if (require.main === module) {
//    makepassword('./password.txt', './password.enc.txt')
//}

module.exports = {makepassword};