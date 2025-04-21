const mongoose = require("mongoose")

const Author = mongoose.model("author", {
  name: {
    type: "String",
    required: true,
  },
})

module.exports = Author
