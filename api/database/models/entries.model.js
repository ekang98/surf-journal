const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
  username: { type: String, required: true },
  rating: {type: Number, required: true},
  date: {type: Date, required: true},
  spot: {type: String, required: true},
  tide: {type: Number},
  swellSize: {type: Number},
  swellDirection: {type: Number},
  swellPeriod: {type: Number},
  windSpeed: {type: Number},
  windDirection: {type: Number}
}, {
  timestamps: true,
})

const Entries = mongoose.model('Entry', entrySchema)

module.exports = Entries;