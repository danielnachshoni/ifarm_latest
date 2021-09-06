const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')

const Orders = require('../models/orders')

// @desc    Show/add items
// @route GET /orders/add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('orders/add')
})

module.exports = router