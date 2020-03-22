// Inport ation des variables d'environnement
require('dotenv').config();

const express = require('express');
const app = express();

const session = require('express-session'); 
const router = require('./app/router');

// Définition du PORT d'écoute 
const PORT = process.env.PORT || 5000;

// Ajout des paramètres du moteur de vues
app.set("view engine", "ejs"); 
app.set("views", "./app/views"); 

// Puisque que nous avons
app.use(session({
  secret: 'keyboard cat',
  resave: true, 
  saveUninitialized: true, 
  cookie: { 
    secure: false, 
    maxAge: (1000*60*60),
  }
}));

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
