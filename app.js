//
// This is from the Treehouse course
// Asynchronous Code in Express, by Treasure Porth
//

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


// Middleware to wrap all routes in try/catch block
function asyncHandler(cb) {
	return async (req,res,next) => {
		try {
			await cb(req,res,next);
		} catch(err) {
			res.render('error', {error: err} );
		}
	}
}




// // **********************************
// // CALL BACKS
// // **********************************
// function getUsers(cb){
// 	// make request
// 	fs.readFile('data.json', 'utf8', (err, data) => {
// 		// if error, return the callback function with error as argument
// 		if (err) return cb(err);
// 		// If error, none of the below code is executed
// 		// parse response data and assign to variable
// 		const users = JSON.parse(data);
// 		// return callback function
// 		// if we're returning this, it means there was no error, so
// 		// we pass 'null' as the first argument
// 		// we pass our 'users' data as the second argument
// 		// the callback function then takes these arguments
// 		// and executes the code in the callback
// 		return cb(null, users);
// 	});
// }

// // when user goes to 'localhost:3000'
// app.get('/', (req,res) => {
// 	// call getUsers and pass it the callback function
//   getUsers( (err, users) => {
// 		// when getUsers is returned,
// 		// if an error is returned, render 'error' pug template
// 		if(err){
// 			res.render('error', {error:err});
// 		} else {
// 			// otherwise render 'index' pug template
// 			// and pass it 'title' and 'users'
// 			res.render('index', {title: 'Users', users: users.users})
// 		}
// 	} );
// }); 



// // **********************************
// // PROMISES
// // **********************************
// function getUsers(){
// 	// Create and return a new Promise
// 	return new Promise((resolve, reject) => {
// 		// make request for data
// 		fs.readFile('data.json', 'utf-8', (err, data) => {
// 			if(err) {
// 				// if error, reject promise with err
// 				reject(err);
// 			} else {
// 				const users = JSON.parse(data);
// 				// if no error, resolve promise with 'users' data
// 				resolve(users);
// 			}
// 		});
// 	});
// }

// app.get('/', (req,res) => {
// 	// call getUsers(), then do something with the returned promise
// 	getUsers()
// 		.then((users) => {
// 			// throw new Error('Noooooooo');
// 			res.render('index', {title: 'Users', users: users.users});
// 		})
// 		// or if an error, display error pug template
// 		.catch((err) => {
// 			res.render('error', {error: err});
// 		});
// }); 



// **********************************
// ASYNC/AWAIT
// **********************************
function getUsers(){
	// This function doesn't need to be changed at all
	// because we are already returning a Promise.
	return new Promise((resolve, reject) => {
		fs.readFile('data.json', 'utf-8', (err, data) => {
			if(err) {
				reject(err);
			} else {
				const users = JSON.parse(data);
				resolve(users);
			}
		});
	});
}

// Add 'async'
app.get('/', asyncHandler(async (req, res) => {
  // we got rid of the try/catch block down here
  // because we added it as middleware up at top of file
	// so that we can use it for all our routes
	// Added that middleware in our route request 'asyncHandler()'
	// using our code here as a callback for it

  // use 'await' keyword before getUsers and assign the result to a variable
  // await is saying, run this line of code
  // and don't run the next line until it finishes
  const users = await getUsers();
  // Benefit of using async/await is that we can write
  // as many async actions that we want.
  // const doSomethingElse = await doSomethingElse();
  res.render("index", { title: "Users", users: users.users });
})); 





app.listen(3000, () => console.log('App listening on port 3000!'));