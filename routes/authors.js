const express = require("express")
const router = express.Router()

const Author = require("../models/author")

// All Authors
router.get("/", async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i")
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render("authors/index", {
      authors,
      searchOptions: req.query,
    })
  } catch {
    res.redirect("/")
  }
})

// New Authors
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() })
})

// New Authors
router.post("/", async (req, res) => {
  const author = await Author({
    name: req.body.name,
  })
  try {
    const newAuthor = await author.save()
    res.redirect(`authors`)
  } catch {
    res.render("authors/new", {
      author,
      errorMessage: "Error creating author",
    })
  }
})

module.exports = router
