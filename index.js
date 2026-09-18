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


// Affiche le tableau de bord complet du groupe
function afficherListe() {
  console.log("\n--- LISTE DES APPRENANTS ---");
  for (let i = 0; i < apprenants.length; i++) {
    let apprenant = apprenants[i];
    let prog = fonctions.calculerProgression(apprenant);
    console.log(
      "ID: " + apprenant.id + " | Nom: " + apprenant.nomComplet +
      " | Ville: " + apprenant.ville + " | Progression: " + prog.pourcentage + "% (" + prog.niveau + ")"
    );
  }
  console.log("");
}


// Action pour ajouter un apprenant
async function actionAjouter() {
  let idTexte = await rl.question("Identifiant de l'apprenant (nombre) : ");
  let id = parseInt(idTexte);
  if (isNaN(id)) {
    console.log("Erreur : identifiant invalide.\n");
    return;
  }
  let nom = await rl.question("Nom complet : ");
  let ville = await rl.question("Ville : ");
  fonctions.ajouterApprenant(apprenants, id, nom, ville);
  console.log("");
}
 
// Action pour consulter un apprenant par identifiant
async function actionConsulter() {
  let idTexte = await rl.question("Identifiant de l'apprenant à consulter : ");
  let id = parseInt(idTexte);
  let apprenant = fonctions.trouverParId(apprenants, id);
 
  if (!apprenant) {
    console.log("Apprenant introuvable.\n");
    return;
  }
 
  let prog = fonctions.calculerProgression(apprenant);
  console.log("\n--- FICHE APPRENANT ---");
  console.log("ID : " + apprenant.id);
  console.log("Nom : " + apprenant.nomComplet);
  console.log("Ville : " + apprenant.ville);
  console.log("Progression : " + prog.pourcentage + "% (" + prog.totalTermines + "/" + prog.totalProposes + " exercices)");
  console.log("Niveau : " + prog.niveau);
  console.log("Challenges terminés : " + prog.challengesTermines);
  console.log("Journées renseignées : " + prog.journeesRenseignees + "\n");
}
// Action pour rechercher un apprenant par nom
async function actionRecherche() {
  let terme = await rl.question("Entrez tout ou partie du nom à rechercher : ");
  let resultats = fonctions.rechercherParNom(apprenants, terme);
 
  console.log("\n--- RÉSULTATS DE RECHERCHE (" + resultats.length + ") ---");
  for (let i = 0; i < resultats.length; i++) {
    let apprenant = resultats[i];
    let prog = fonctions.calculerProgression(apprenant);
    console.log("- ID: " + apprenant.id + " | Nom: " + apprenant.nomComplet + " | " + prog.pourcentage + "% (" + prog.niveau + ")");
  }
  console.log("");
}

// Action pour filtrer les apprenants par niveau
async function actionFiltrer() {
  console.log("Niveaux disponibles : Solide, En progression, À renforcer");
  let niveau = await rl.question("Entrez le niveau souhaité : ");
  let resultats = fonctions.filtrerParNiveau(apprenants, niveau);
 
  console.log("\n--- FILTRE : " + niveau.toUpperCase() + " (" + resultats.length + ") ---");
  for (let i = 0; i < resultats.length; i++) {
    let prog = fonctions.calculerProgression(resultats[i]);
    console.log("- " + resultats[i].nomComplet + " : " + prog.pourcentage + "%");
  }
  console.log("");
}

// Action pour trier les apprenants par ordre alphabétique
function actionTrierAlphabet() {
  let tri = fonctions.trierParAlphabet(apprenants);
  console.log("\n--- TRI PAR ORDRE ALPHABÉTIQUE ---");
  for (let i = 0; i < tri.length; i++) {
    console.log((i + 1) + ". " + tri[i].nomComplet + " (" + tri[i].ville + ")");
  }
  console.log("");
}

// Action pour enregistrer le résultat d'une journée pour un apprenant
async function actionEnregistrer() {
  let idTexte = await rl.question("Identifiant de l'apprenant : ");
  let id = parseInt(idTexte);
  let apprenant = fonctions.trouverParId(apprenants, id);

  if (!apprenant) {
    console.log("Erreur : apprenant non trouvé.\n");
    return;
  }
  console.log("Apprenant trouvé : " + apprenant.nomComplet);

  let jourTexte = await rl.question("Jour (1 à 7) : ");
  let exercicesTexte = await rl.question("Exercices terminés : ");
  let totalTexte = await rl.question("Total d'exercices proposés : ");
  let challengeTexte = await rl.question("Challenge terminé ? (oui/non) : ");

  let jour = parseInt(jourTexte);
  let exercicesTermines = parseInt(exercicesTexte);
  let totalExercices = parseInt(totalTexte);
  let challengeTermine = challengeTexte.trim().toLowerCase() === "oui";

  console.log("");
  fonctions.enregistrerResultat(apprenants, id, jour, exercicesTermines, totalExercices, challengeTermine);
  console.log("");
}

// Action pour trier les apprenants par progression décroissante
function actionTrierProgression() {
  let tri = fonctions.trierParProgression(apprenants);
  console.log("\n--- TRI PAR PROGRESSION DÉCROISSANTE ---");
  for (let i = 0; i < tri.length; i++) {
    let prog = fonctions.calculerProgression(tri[i]);
    console.log((i + 1) + ". " + tri[i].nomComplet + " - " + prog.pourcentage + "% (" + prog.niveau + ")");
  }
  console.log("");
}

// Boucle principale : affiche le menu jusqu'à ce que l'utilisateur choisisse 0
// Boucle principale : affiche le menu jusqu'à ce que l'utilisateur choisisse 0
async function demarrer() {
  let continuer = true;

  while (continuer) {
    let choix = await afficherMenu();

    if (choix === "1") {
      fonctions.afficherTableauDeBord(apprenants);
    } else if (choix === "2") {
      afficherListe();
    } else if (choix === "3") {
      await actionAjouter();
    } else if (choix === "4") {
      await actionConsulter();
    } else if (choix === "5") {
      await actionEnregistrer();
    } else if (choix === "6") {
      await actionRecherche();
    } else if (choix === "7") {
      await actionFiltrer();
    } else if (choix === "8") {
      actionTrierProgression();
    } else if (choix === "9") {
      actionTrierAlphabet();
    } else if (choix === "0") {
      console.log("Fermeture du programme. Au revoir !");
      continuer = false;
    } else {
      console.log("Choix invalide, veuillez réessayer.\n");
    }
  }

  rl.close();   // <- ferme proprement l'entrée clavier une fois la boucle terminée
}

demarrer();      // <- lance vraiment le programme ; sans cette ligne, rien ne se passe