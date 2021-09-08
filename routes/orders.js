const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Orders = require('../models/orders')

// @desc    Show/add items
// @route GET /orders/add
router.post('/', ensureAuth, async (req,res)=>{
    try{
        req.body.user = req.user.id
        await Orders.create(req.body)
        res.redirect('/dashboard')

    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router