const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));








//CALL BACKS
function getUsers(cb){
	// make request
	fs.readFile('data.json', 'utf8', (err, data) => {
		// if error, return the callback function with error as argument
		if (err) return cb(err);
		// If error, none of the below code is executed
		// parse response data and assign to variable
		const users = JSON.parse(data);
		// return callback function
		// if we're returning this, it means there was no error, so
		// we pass 'null' as the first argument
		// we pass our 'users' data as the second argument
		// the callback function then takes these arguments
		// and executes the code in the callback
		return cb(null, users);
	});
}






//CALL BACKS
function getUsers(cb){
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return cb(err);
    const users = JSON.parse(data);
    return cb(null, users);
  });
}

app.get('/', (req,res) => {
  
}); 


app.listen(3000, () => console.log('App listening on port 3000!'));