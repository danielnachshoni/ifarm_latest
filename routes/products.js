const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const Products = require("../models/product")

// @desc Show/add items  @route GET /orders/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("products/add")
})

// @desc    Show/add items
// @route GET /orders/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("products/add")
})

// @desc    Show/add items
// @route GET /orders/add
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Products.create(req.body)
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
    let product = await Products.findById(req.params.id).populate("user").lean()

    if (!product) {
      return res.render("error/404")
    }
    res.render("products/show", {
      product,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})

// @desc    Show all items
//  @route  GET /products/
router.get("/", ensureAuth, async (req, res) => {
  try {
    const product = await Products.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean()
    res.render("products/index", { product })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const product = await Products.findOne({
      _id: req.params.id,
    }).lean()

    if (!product) {
      return res.render("error/404")
    }

    if (product.user != req.user.id) {
      res.redirect("/products")
    } else {
      res.render("products/edit", {
        product,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc    Update product
// @route PUT /products/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let product = await Products.findById(req.params.id).lean()

    if (!product) {
      return res.render("error/404")
    }

    if (product.user != req.user.id) {
      res.redirect("/products")
    } else {
      product = await Products.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
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
    await Products.remove({ _id: req.params.id })
    res.redirect("/dashboard")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc  User products
// @route GET /products/user/:userid
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const product = await Products.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user")
      .lean()

    res.render("products/index", {
      product,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

module.exports = router
