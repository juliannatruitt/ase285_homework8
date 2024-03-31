# Architecture Design:

###Main Module (Main.js):
- Entry point of the application.
- Parses command-line arguments to determine whether to sign in or sign up.
- Calls appropriate functions based on user input.
- Responsibilities:
	- Parses command-line arguments.
	- Calls appropriate functions based on user input.
Interfaces:
	- Calls functions from the Signin and Signup modules.

###Utility Module (utility.js):
- Contains utility functions for file handling, hashing, and interaction with the database.
- Responsibilities:
	- Provides utility functions for file handling, hashing, and database interaction.
- Interfaces:
	- Exports functions for reading, writing, and appending to files.
	- Exports functions for hashing passwords and interacting with MongoDB.
### Signin Module (signin.js) and Signup Module (signup.js):
- Handles user authentication and account creation, respectively.
- Utilizes utility functions for file handling and database interaction.
- Responsibilities:
	- Handles user authentication and account creation, respectively.
	- Utilizes utility functions for file handling and database interaction.
- Interfaces:
	- Exports functions for signing in and signing up.

###Database Module (Users.js):
- Defines the schema for user data in MongoDB.
- Utilizes Mongoose for interaction with the MongoDB database.
- Interfaces:
	- Exports the Mongoose model for the Users collection.
	
## Rationale:
	- To create a seperation of concerns of the module. Each module is tasked with a seperate responsibility (following single responsibility principle).

## Input, Output, and Information Flow:
- input:
		- user specified if they are signing-in or signin-up to start.
		- then users enter in an email address and password.
- ouput:
	- users get returned true or false (if using signin).
	- users get returned a message of if their user credentials were added to the database or not. (if using signup).
- infromation flow:
	- users start out running the index.js file with the given parameters.
	- if users are signing-in:
		- information is passed to signin.js
		- data is then passed to the utility to read from a function that will read from the text file of users and see if the email matches any of the users listed.
			- if email matches, then data is passed into the utility function that reads from the mongodb database and compares the login credentials with the stored user. If the password matches the encypted password stored on the database, a value of true is returned, indicating that this is an authorized user.
			- if email does not match any of the users, the value false is returned to the user, indicating that they either entered the wrong email or password.
		- user is returned a value of true or false depending on if their information corresponds with an authorized user.
	- if users are signing-up
		- information is passed to signup.js
		- data is then passed to the utility to read from a function that will read from the text file of users and see if the email matches any of the users listed.
			- if email does not match any of the users, then a new user will be created.
				- email and password will first get stored into a text file.
				- then the module makepassword.js will run which will convert the password in that text file, into a new file with the passwords encypted.
				- that will then get directed to the utility module which will use a function to upload the file to mongoose.
				- to avoid adding the same user mulitple times, it will only add users into the database who do not yet exist in there yet.
				- the user will be returned with a message that their user account was successfully created and added to the database.
			- if email matches a user already created
				- user will get returned a message that a user with this email has already been created and to try to login or make an account with a different email.