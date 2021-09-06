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


// Handlebars
app.engine('.hbs',exphbs({defaultLayout: 'main', extname: '.hbs'}));
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

