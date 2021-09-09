const express = require('express')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')

//load config
dotenv.config({ path: './config/config.env' })

//passport config
require('./config/passport')(passport)

connectDB()

const app = express()

// Body Parser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// HandleBars Helpers
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs',exphbs({helpers: { 
    formatDate,
    stripTags, 
    truncate,
    editIcon},
    defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


// SESSION
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI})  //(URI FROM.env file)
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// Global Variable
app.use(function(req, res, next){
    res.locals.user = req.user || null
    next()
})

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/orders', require('./routes/orders'))

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

