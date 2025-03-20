const express = require('express')
const morgan = require('morgan')
const {Client}=require('pg');


const port = 3000

// Create the Express app
const app = express()

// Connect to the database




// register view engine
app.set('view engine','ejs');

// listen for requests
app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
}
);

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// routes

//forum route
const forumRoutes = require('./routes/forumRoutes');
app.use('/api/forum', forumRoutes);

//courses route
const coursesRoutes = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRoutes);








