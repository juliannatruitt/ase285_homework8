'use strict'
const {signin} = require('./src/signin')
const {signup} = require('./src/signup')

async function runmain(){
    if (process.argv.length != 5) return false;

    let signin_or_signup= process.argv[2];
    let email = process.argv[3];
    let password = process.argv[4];

    let passwordFile = './data/password.txt'
    let encryptedPasswordFile = './data/password.enc.txt'

    if (signin_or_signup.toLowerCase() === 'signin'){
        return await signin(email, password, passwordFile);
    }else{
        if(signin_or_signup.toLowerCase() === 'signup'){
            return await signup(email, password, passwordFile,encryptedPasswordFile);
        }
        else return "must use 'signin' or 'signout'";
    }
}

async function main(){
    console.log(await runmain());
}

main();