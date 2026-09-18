//functions 

function normaliserNom(nom) {
  if (!nom) {
    return "";
  }
  nom = nom.trim().toLowerCase();
  let mots = nom.split(" ");
  let nomPropre = "";
 
  for (let i = 0; i < mots.length; i++) {
    if (mots[i].length > 0) {
      let premiereLettre = mots[i][0].toUpperCase();
      let resteDuMot = mots[i].slice(1);
      nomPropre = nomPropre + premiereLettre + resteDuMot + " ";
    }
  }
  return nomPropre.trim();
}

// 2. Vérifie que le jour et les exercices sont cohérents
function validerResultat(jour, exercicesTermines, totalExercices) {
  if (jour < 1 || jour > 7) {
    console.log("Erreur : le jour doit être compris entre 1 et 7.");
    return false;
  }
  if (exercicesTermines < 0 || totalExercices <= 0) {
    console.log("Erreur : les nombres d'exercices doivent être positifs.");
    return false;
  }
}

// 3. Calcule tous les indicateurs de progression d'un apprenant
function calculerProgression(apprenant) {
  let totalTermines = 0;
  let totalProposes = 0;
  let challengesTermines = 0;
 
  for (let i = 0; i < apprenant.resultats.length; i++) {
    let resultat = apprenant.resultats[i];
    totalTermines = totalTermines + resultat.exercicesTermines;
    totalProposes = totalProposes + resultat.totalExercices;
    if (resultat.challengeTermine === true) {
      challengesTermines = challengesTermines + 1;
    }
  }
}


// 4. Ajoute un apprenant en refusant les identifiants déjà utilisés
function ajouterApprenant(apprenants, id, nomComplet, ville) {
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
      console.log("Erreur : cet identifiant existe déjà.");
      return false;
    }
  }
  let nouvelApprenant = {
    id: id,
    nomComplet: normaliserNom(nomComplet),
    ville: ville ? ville.trim() : "",
    resultats: []
  };

  apprenants.push(nouvelApprenant);
  console.log("Apprenant ajouté avec succès !");
  return true;
}
