const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")
const Orders = require("../models/orders")
const Users = require("../models/User")

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

// @desc    shopping catr
// @route   post /order/:id
router.post("/", ensureAuth, async (req, res) => {
  try {
    const _user = req.user
    var toAdd = {
      prod_id: req.body.update,
      qnty: req.body.amount,
      prod_name: req.body.var2,
      price: req.body.var1,
    }
    console.log(toAdd)
    _user.Cart.push(toAdd)
    _user.save()

    res.redirect("/shoppingcart")
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

//delete item from shopping cart
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const _user = req.user
    console.log(req.user.id)
    _user.Cart.pull({ _id: req.params.id })
    _user.save()
    res.redirect("/shoppingcart")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc    Shoppincart
// @route   GET /shoppingcart
router.get("/shoppingcart", ensureAuth, async (req, res) => {
  try {
    const _user = await Users.findById(req.user._id).lean()
    res.render("shoppingcart", {
      name: _user.firstName,
      lastName: _user.lastName,
      img: _user.image,
      cart: _user.Cart,
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

// @desc  login/landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" })
})

// @desc    DASHBOARD
// @route   GET /dashboard
router.get("/payment", ensureAuth, async (req, res) => {
  try {
    const order = await Orders.find({ user: req.user.id }).lean()
    // console.log(req)
    res.render("payment", {
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

//delete item from shopping cart
router.delete("/payment/:id", ensureAuth, async (req, res) => {
  try {
    const _user = req.user
    console.log(req.user.id)
    _user.Cart.pull({ _id: req.params.id })
    _user.save()
    res.redirect("/payment")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

module.exports = router
