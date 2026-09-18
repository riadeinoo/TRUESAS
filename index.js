// Point d'entrée du programme : affiche le menu et lance les actions
 
const readline = require("readline/promises");
const apprenants = require("./info");
const fonctions = require("./code");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Affiche le menu et retourne le choix tapé par l'utilisateur
async function afficherMenu() {
  console.log("SAS PROGRESS CONSOLE");
  console.log("1. Afficher le tableau de bord");
  console.log("2. Afficher la liste des apprenants");
  console.log("3. Ajouter un apprenant");
  console.log("4. Consulter un apprenant par identifiant");
  console.log("5. Ajouter ou modifier le résultat d'une journée");
  console.log("6. Rechercher un apprenant par nom");
  console.log("7. Filtrer les apprenants par niveau");
  console.log("8. Trier les apprenants par progression décroissante");
  console.log("9. Trier les apprenants par ordre alphabétique");
  console.log("0. Quitter");
 
  let choix = await rl.question("Votre choix : ");
  return choix.trim();
}
 