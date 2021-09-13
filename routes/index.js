const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Orders = require("../models/orders")
const Users = require("../models/User")

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
      date: req.user.createdAt,
      order,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

router.post("/", ensureAuth, async (req, res) => {
  try {
    const _user = req.user
    var toAdd = { orders: req.body.update, qnty: req.body.amount }
    _user.Cart.push(toAdd)
    _user.save()

    // console.log(_user.Cart)
    res.redirect("/shoppingcart")
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc    Shoppincart
// @route   GET /shoppingcart
router.get("/shoppingcart", ensureAuth, async (req, res) => {
  try {
    // const order = await Orders.find({ user: req.user.id }).lean()
    res.render("shoppingcart", {
      name: req.user.firstName,
      lastName: req.user.lastName,
      img: req.user.image,
      user: req.user,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Orders.create(req.body)
    res.redirect("/dashboard")
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
