const express = require("express")
const router = express.Router()
const { ensureAuth} = require("../middleware/auth")
const Orders = require("../models/orders")

// @desc Show/add items  @route GET /orders/add 
router.get("/add", ensureAuth, (req,res)=>{ res.render("orders/add") }) 

// @desc    Show/add items
// @route GET /orders/add
router.post("/", ensureAuth, async (req,res)=>{
	try{
		req.body.user = req.user.id
		await Orders.create(req.body)
		res.redirect("/dashboard")

	} catch (err) {
		console.error(err)
		res.render("error/500")
	}
})

// @desc    Show all items
//  @route  GET /orders/
router.get("/", ensureAuth, async (req,res)=>{
	try {
		const orders = await Orders.find({status: "public"})
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean()
		res.render("orders/index", {orders,})

	} catch (err){
		console.error(err)
		res.render("error/500")
	}
}) 


module.exports = router