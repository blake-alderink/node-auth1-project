// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const Users = require('./users-model')
const express = require('express');
const { restricted } = require('../auth/auth-middleware')
const router = express.Router();





router.get('/', restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(404).json({
      message: "this did not work, sorry, try again"
    })
  })
})
/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


module.exports = router;

// Don't forget to add the router to the `exports` object so it can be required in other modules
