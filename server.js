// Konfigurasi .env
require("dotenv").config()

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

// Connect to Mongo
const mongoose = require("mongoose")
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to db"))
  .catch((rejected) => console.log(rejected))

// Setup EJS
app.set("view engine", "ejs")
app.set("layout", "layouts/layout")
app.use(express.static("public"))
app.use(expressLayouts)

// Routes
app.use("/", indexRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running http://localhost:3000`)
})
