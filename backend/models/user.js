const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});

module.exports = mongoose.model("user", userSchema);