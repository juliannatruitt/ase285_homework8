'use strict'
const {readFile, writeFile, hash, uploadToMongoose} = require('./utility');
const fs = require('fs');

async function makepassword(passwordFileName, encryptedPasswordFileName) {
   let credentials = readFile(passwordFileName);
   let encCredentials = [];
   while (credentials.length > 0){
       let getCredential = credentials.shift();
       let [username, password] = getCredential.split(':');
       let encryptedPassword = hash(password.trim());
       encCredentials.push(`${username}:${encryptedPassword}`);
   }
   writeFile(encCredentials, encryptedPasswordFileName);
   await uploadToMongoose(encCredentials);
   fs.unlinkSync(encryptedPasswordFileName);
}

module.exports = {makepassword};