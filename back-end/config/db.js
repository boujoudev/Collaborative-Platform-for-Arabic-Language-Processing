const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your existing PostgreSQL credentials
const sequelize = new Sequelize({
  database: 'pfe',
  username: 'pfe',
  password: '1234',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,     // Maximum number of connections in pool
    min: 0,     // Minimum number of connections in pool
    acquire: 30000, // Maximum time (ms) that pool will try to get connection before throwing error
    idle: 10000 // Maximum time (ms) that a connection can be idle before being released
  },
  define: {
    timestamps: true, // Enable timestamps (created_at, updated_at)
    underscored: true, // Use snake_case for automatically added fields
    createdAt: 'created_at', // Map createdAt to created_at
    updatedAt: false // Disable updated_at since your schema doesn't use it
  },
  logging: false // Set to console.log to see SQL queries
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;