const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const Orders = require("../models/orders")
const User = require("../models/User")

// @desc Show/add items  @route GET /orders/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("orders/add")
})

// @desc    Show/add items
// @route GET /orders/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("orders/add")
})

// @desc    Show/add items
// @route GET /orders/add
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

// @desc    Show more...
// @route GET /orders/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let order = await Orders.findById(req.params.id).populate("user").lean()

    if (!order) {
      return res.render("error/404")
    }
    res.render("orders/show", {
      order,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})

// @desc    Show all items
//  @route  GET /orders/
router.get("/", ensureAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean()
    res.render("orders/index", { orders })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const order = await Orders.findOne({
      _id: req.params.id,
    }).lean()

    if (!order) {
      return res.render("error/404")
    }

    if (order.user != req.user.id) {
      res.redirect("/orders")
    } else {
      res.render("orders/edit", {
        order,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc    Update order
// @route PUT /orders/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let order = await Orders.findById(req.params.id).lean()

    if (!order) {
      return res.render("error/404")
    }

    if (order.user != req.user.id) {
      res.redirect("/orders")
    } else {
      order = await Orders.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })
      res.redirect("/dashboard")
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc  DELETE oreder
// @route DELETE /ders/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Orders.remove({ _id: req.params.id })
    res.redirect("/dashboard")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})
router.get("/add-to-cart/:product-id/:amount", (req, res) => {
const cart = {
  prodactId: req.params.product-id,
  amount: req.params.amount
}
  User.findOneAndUpdate({ _id: req.user.id }, 

    cart.push(cart)//,
  //   {
  //   new: true,
  //   runValidators: true,
  // }
  )
  res.redirect("/orders")
} )
// @desc  User orders
// @route GET /orders/user/:userid
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const orders = await Orders.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean()

    res.render("orders/index", {
      orders,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

module.exports = router
