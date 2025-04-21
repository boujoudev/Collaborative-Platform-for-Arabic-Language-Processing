const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialiser Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cpalp-aa7f6-default-rtdb.firebaseio.com"
});

// Obtenir une référence à la base de données
const db = admin.database();

module.exports = { db, admin }; 