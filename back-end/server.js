// Importations
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');

// Config .env
dotenv.config({ path: './back-end/.env' });

// Variables d’environnement
const port = process.env.PORT || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

// DB & Sequelize
const db = require('./config/db');
const { sequelize } = require('./models');

// Express app & HTTP server
const app = express();
const server = http.createServer(app);

// Socket.IO config
const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO events
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`👤 User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Rendre io accessible dans req.app.get('io')
app.set('io', io);

// Middlewares globaux
app.use(cors({
  origin: clientUrl,
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/forums', require('./routes/forumRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/corpus', require('./routes/corpusRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/nlp-tools', require('./routes/nlpToolRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/files', require('./routes/fileRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/', require('./routes/skillRoutes'));
app.use('/', require('./routes/experienceRoutes'));
app.use(require('./routes/authcheckRoutes'));

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware d'erreur global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// démarrage serveur
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});