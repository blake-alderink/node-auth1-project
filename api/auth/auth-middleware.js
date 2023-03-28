
const Users = require('../users/users-model')


/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
async function restricted(req, res, next) {
      if (req.session.user) {
        next()
      } else {
        next({message: "this is not gonna work because it is RESTRICTED"})
      }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  
  if (await Users.findBy({ username: req.body.username})) { //need to use the syntax from below, becuase hte promise will return an array which is truthy even if it is an empty array - need to put it in a variable and use the length of the array as the truthy/falsy value
          next({message: "Username taken"})
  } else {
next();
  }

}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  try{
  const users = await Users.findBy({ username: req.body.username})
  if (users.length) {
    next()
} else {
  next({message: "Invalid credentials"})
}
  } catch (err) {
    next(err)
  }

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
async function checkPasswordLength(req, res, next) {
  if (req.body.password && req.body.password.length >= 3) {
    next()
  } else {
    next({message: "Password must be longer than 3 chars"})
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules


module.exports = {
  restricted,
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree
}