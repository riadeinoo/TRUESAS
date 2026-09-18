// Point d'entrée du programme : affiche le menu et lance les actions
 
const readline = require("readline/promises");
const apprenants = require("./data");
const fonctions = require("./progression");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 