const mongoose = require("mongoose")

let Marker = mongoose.model("marker", {
    username: String,
    type: String,
    latitude: Number,
    longitude: Number,

})

module.exports = {
    Marker: Marker
}