# Asynchronous Code in Express - Full Stack JavaScript Techdegree

## To view project
1. Download project.
2. Run 'npm install' in the command line.
3. Run 'npm start' in the command line.
4. Go to 'localhost:3000' in your browser.

## Project objective
Exercise exploring various methods for making asynchronous calls to a database when using Express. 

## Techniques and concepts
- Callbacks
- Promises
- Async/Await

## Code example
```javascript
// **********************************
// ASYNC/AWAIT
// **********************************

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

function getUsers(){
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

app.get('/', asyncHandler(async (req, res) => {
  // use 'await' keyword before getUsers and assign the result to a variable
  // await is saying, run this line of code
  // and don't run the next line until it finishes
  const users = await getUsers();
  // Benefit of using async/await is that we can write
  // as many async actions as we want here
  // const doSomethingElse = await doSomethingElse();
  res.render("index", { title: "Users", users: users.users });
})); 
```

## Acknowledgements
This project was built as part of the [Full Stack JavaScript Techdegree](https://join.teamtreehouse.com/techdegree/) offered by [Treehouse](https://teamtreehouse.com) :raised_hands:
