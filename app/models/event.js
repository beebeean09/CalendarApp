// Cache system for each event

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EventSchema = new Schema({
    title: String,
    description: String,
    attendees: String,
    startDate: String,
    endDate: String
});

module.exports = mongoose.model('Event', EventSchema);
