const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Products = require("../models/product")

// login/landing page
// @route GET /

// @desc    DASHBOARD
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const product = await Products.find({ user: req.user.id }).lean()
    res.render("dashboard", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      product,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

router.get("/history", ensureAuth, async (req, res) => {
  try {
    const product = await Products.find({ user: req.user.id }).lean()
    res.render("dashboard", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      date: req.user.product,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// login/landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" })
})

module.exports = router
