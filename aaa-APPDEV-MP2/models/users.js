const mongoose = require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    latitude: Number,
    longitude: Number,
    symptoms: [String],
    status: String
})

module.exports = {
    User : User
}