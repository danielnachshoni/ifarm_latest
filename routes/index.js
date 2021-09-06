const express = require('express')
const router = express.Router()

// login/landing page
// @route GET / 


// @desc    DASHBOARD
// @route   GET /dashboard
router.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})

// login/landing page
// @route GET / 
router.get('/', (req,res)=>{
    res.render('login',
    {layout: 'login'})
})

module.exports = router