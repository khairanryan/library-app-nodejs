// Konfigurasi .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index")
const authorRouter = require("./routes/authors")

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
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use("/", indexRouter)
app.use("/authors", authorRouter)

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running http://localhost:3000`)
})
