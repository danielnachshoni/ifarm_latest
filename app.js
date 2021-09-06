const express = require('express')
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
// app.engine('hbs', hbs({
//     partialsDir : [
//         path.join(__dirname, 'views/partials')
//     ]
// }));

// SESSION
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//STATIC FOLDER
app.use(express.static(path.join(__dirname,'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000

app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

