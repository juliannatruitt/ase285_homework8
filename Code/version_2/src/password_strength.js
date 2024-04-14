'use strict'
function password_strength(password){
    let containsCapitalLetter = /[A-Z]/.test(password);
    let contains8Characters = password.length >= 8;
    let containsOtherCharacter = /[^A-Za-z0-9]/.test(password);

    if (containsCapitalLetter && contains8Characters && containsOtherCharacter){
        return true;
    }
    return false;
}

module.exports = {password_strength};