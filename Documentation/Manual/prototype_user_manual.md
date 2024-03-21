# User Manual - Prototype

* Run the passwordjs.js file from the command line.

    - This will expect 4 inputs from the user "node passwordjs.js email password"

        -Where email is the email you want to insert and password is the password given.

    - if the email already exists in the file/database, then it will exeucte if you entered in the correct password or not, and return true or false depending on if you entered in the correct password.

    - if the email does not exists, the users credentials will be stored in a text file, which will then be appended to the encypted text file and then appended to the database to store the user information.