const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Orders = require("../models/orders")

// login/landing page
// @route GET /

// @desc    DASHBOARD
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const order = await Orders.find({ user: req.user.id }).lean()
    res.render("dashboard", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      img: req.user.image,
      order,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc    Shoppincart
// @route   GET /shoppingcart
router.get("/shoppingcart", ensureAuth, async (req, res) => {
  try {
    const order = await Orders.find({ user: req.user.id }).lean()
    res.render("shoppingcart", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      img: req.user.image,
      order,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc    DASHBOARD
// @route   GET /dashboard
router.get("/shoppingcart", ensureAuth, async (req, res) => {
  try {
    const order = await Orders.find({ user: req.user.id }).lean()
    res.render("shoppingcart", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      order,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc  login/landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" })
})

module.exports = router
