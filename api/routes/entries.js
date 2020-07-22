const router = require('express').Router()
let Entries = require('../database/models/entries.model')

router.route('/').get((req, res) => {
  Entries.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const spot = req.body.spot
  const date = req.body.date
  const rating = req.body.rating
  const tide = req.body.tide ? Number(req.body.tide) : null
  const swellSize = req.body.swellSize ? Number(req.body.swellSize) : null
  const swellDirection = req.body.swellDirection ? Number(req.body.swellDirection) : null
  const swellPeriod = req.body.swellPeriod ? Number(req.body.swellPeriod) : null
  const windSpeed = req.body.windSpeed ? Number(req.body.windSpeed) : null
  const windDirection = req.body.windDirection ? Number(req.body.windDirection) : null

  const newEntry = new Entries({
    username : username, 
    rating : rating,
    date : date,
    spot : spot,
    tide : tide,
    swellSize : swellSize,
    swellDirection : swellDirection,
    swellPeriod : swellPeriod,
    windSpeed : windSpeed,
    windDirection : windDirection
  })

  newEntry.save()
    .then(() => res.json(newEntry._id))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/user').get((req, res) => {
  Entries.find({ username : req.query.username })
    .sort('-date')
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/delete').delete((req, res) => {
  Entries.findByIdAndDelete(req.query.id)
    .then(() => res.json('Entry Deleted'))
    .catch(err => res.status(400).json('Error: ') + err)
})

// router.route('/:id').get((req, res) => {\
//   Entries.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.route('/update/:id').post((req, res) => {
//   Entries.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username
//       exercise.rating = Number(req.body.rating)
//       exercise.tide = Number(req.body.tide)
//       exercise.swellSize = Number(req.body.swellSize)
//       exercise.wellDirection = Number(req.body.swellDirection)
//       exercise.swellPeriod = Number(req.body.swellPeriod)
//       exercise.windSpeed = Number(req.body.windSpeed)
//       exercise.windDirection = Number(req.body.windDirection)

//       exercise.save()
//         .then(() => res.json('Exercise updated.'))
//         .catch(err => res.status(400).json('Error: ' + err))
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// })

module.exports = router