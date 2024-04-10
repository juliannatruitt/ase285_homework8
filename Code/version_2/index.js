'use strict'
const {signin} = require('./util/signin')
const {signup} = require('./util/signup')

async function runmain(){
    if (process.argv.length != 5) return 'false';

    let signin_or_signup= process.argv[2];
    let email = process.argv[3];
    let password = process.argv[4];

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
    console.log(await runmain());
}

main();