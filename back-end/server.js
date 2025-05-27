const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/db');
const { sequelize } = require('./models');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config({path: './back-end/.env'});
console.log(process.env.GOOGLE_API_KEY)


dotenv.config();

const port = process.env.PORT || 3000;

// Create the Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // l'origine de ton front (Postman ne met rien ici, donc ça passe, mais pour navigateur c'est essentiel)
  credentials: true // <-- Important pour que les cookies soient acceptés côté serveur
})); 
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(morgan('dev')); // HTTP request logger
app.use(express.static('public')); // Serve static files

// Register view engine
app.set('view engine', 'ejs');

// API Routes
// User routes

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Comment routes
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);

// Forum routes
const forumRoutes = require('./routes/forumRoutes');
app.use('/api/forums', forumRoutes);

// Post routes
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// Project routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Corpus routes
const corpusRoutes = require('./routes/corpusRoutes');
app.use('/api/corpus', corpusRoutes);

// Course routes
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

// NLP Tool routes
const nlpToolRoutes = require('./routes/nlpToolRoutes');
app.use('/api/nlp-tools', nlpToolRoutes);

// Event routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

// Chatbot routes
const chatbotRoutes = require('./routes/chatbotRoutes');
app.use('/api/chatbot', chatbotRoutes);

// File routes
const fileRoutes = require('./routes/fileRoutes');
app.use('/api/files', fileRoutes);

// Search routes
const searchRoutes = require('./routes/searchRoutes');
app.use('/api/search', searchRoutes);

// Message routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

// Resource routes
//skills routes

const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const formationRoutes = require('./routes/formationRoutes');
const contactMeRoutes = require('./routes/contactMeRoutes');


// Use routes
app.use('/skills', skillRoutes);
app.use('/experiences', experienceRoutes);
app.use('/formations', formationRoutes);
app.use('/contact', contactMeRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


// Pour recup les photos de profil 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// REFRESH
app.use('/api', require('./routes/authcheckRoutes'));

// Start the server
app.listen(port, () => {    
  console.log(`Server is running on port ${port}`);
});


// PUBLICATION 
const publicationRoutes = require('./routes/publicationRoutes');
app.use('/api/publications', publicationRoutes);


// Evaluation 
const evaluationRoutes = require('./routes/evaluationRoutes');

app.use('/api/evaluations', evaluationRoutes);




