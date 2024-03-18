'use strict'

const fs = require('fs');
const {createHash} = require('crypto')
const Users = require("./models/Users.js");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

function readFile(fileName) {
    if (!fs.existsSync(fileName)) {
        throw `${fileName} does not exist!`
    }
    try {
        var text = fs.readFileSync(fileName).toString('utf-8');
        var textByLine = text.split("\n");
        return textByLine;
    } catch (err) {
        console.log(err)
    }
}

function writeFile(ar, fileName) {
    try {
        var res = ar.join("\n")
        fs.writeFileSync(fileName, res);
    } catch (err) {
        console.log(err)
    }
}

function hash(input) {
    return createHash('sha256').update(input).digest('hex'); // never use md5
}

async function uploadToMongoose(ar){
    await mongoose.connect(process.env.URI);
    console.log("Connected to DB!");
    try{
        while(ar.length > 0) {
            let currentUser = ar.shift();
            let [username, password] = currentUser.split(':')
            let newuser = new Users({
                username: username,
                password: password
            });
            id++;
            await newuser.save();
        }
    }catch (error){
        console.log(error);
    }
    await mongoose.connection.close();
}

async function readFromMongoose(username, password){
    await mongoose.connect(process.env.URI);
    console.log("Reading from the DB!");
    try{
        let allUsers = await Users.find({}).exec();
        for (let i=0; i<allUsers.length; i++){
            if (allUsers[i].username === username) {
                if (hash(password).toString() === allUsers[i].password.toString()) {
                    return true;
                }
            }
        }
        return false;
    }catch (error){
        console.log(error);
    }
    await mongoose.connection.close();
}

module.exports = {readFile, writeFile, hash, uploadToMongoose, readFromMongoose};