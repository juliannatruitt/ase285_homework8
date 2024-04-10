'use strict'
const fs = require('fs');
const util = require('./util/utility')
const {signin} = require('./util/signin')
const {signup} = require('./util/signup')

async function runmain(){
    if (process.argv.length != 5) return 'false';

    var signin_or_signup= process.argv[2];
    var email = process.argv[3];
    var password = process.argv[4];

    if (signin_or_signup.toLowerCase() === 'signin'){
        return await signin(email, password);
    }else{
        if(signin_or_signup.toLowerCase() === 'signup'){
            return await signup(email, password);
        }
        else console.log("must use 'signin' or 'signout'"); return false;
    }
}

async function main(){
    console.log(await runmain());;
}

main();