const router = require('express').Router()
let Users = require('../database/models/users.model')

const bcrypt = require('bcrypt')
const saltRounds = 10

router.route('/').get((req, res) => {
  Users.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/signup').post((req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const newUser = new Users({
      username: username,
      password: hash
    });

    newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err))
  })
})

router.route('/login').post((req, res) => {
  const username = req.body.username
  const password = req.body.password

  Users.findOne({username : username})
    .then(user => {
      if (!user) {
        res.status(400).json('Invalid')
      } else {
        bcrypt.compare(password, user.password, function(err, result) {
          if (result == true) {
            res.json(user)
          } else {
            res.status(400).json('Incorrect Password')
          }
        })
      }
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router