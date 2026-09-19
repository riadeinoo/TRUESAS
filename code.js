// 1. Nettoie et normalise les noms des apprenants
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
  if (exercicesTermines > totalExercices) {
    console.log("Erreur : les exercices terminés ne peuvent pas dépasser le total proposé.");
    return false;
  }
  return true;
}

// 3. Calcule tous les indicateurs de progression d'un apprenant.
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
// Calcul du pourcentage de progression
  let pourcentage = 0;
  if (totalProposes > 0) {
    pourcentage = Math.round((totalTermines / totalProposes) * 100);
  }
// Détermination du niveau de progression
  let niveau = "À renforcer";
  if (pourcentage >= 80) {
    niveau = "Solide";
  } else if (pourcentage >= 50) {
    niveau = "En progression";
  }

  return {
    totalTermines: totalTermines,
    totalProposes: totalProposes,
    pourcentage: pourcentage,
    challengesTermines: challengesTermines,
    journeesRenseignees: apprenant.resultats.length,
    niveau: niveau
  };
}

// 4. Ajoute un apprenant en refusant les identifiants déjà utilisés
function ajouterApprenant(apprenants, id, nomComplet, ville) {
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
      console.log("Erreur : cet identifiant existe déjà.");
      return false;
    }
  }
  // On crée un nouvel objet apprenant avec les informations fournies
  let nouvelApprenant = {
    id: id,
    nomComplet: normaliserNom(nomComplet),
    ville: ville ? ville.trim() : "",
    resultats: []
  };
// On l'ajoute à la liste des apprenants
  apprenants.push(nouvelApprenant);
  console.log("Apprenant ajouté avec succès !");
  return true;
}

// 5. Retrouve un apprenant à partir de son identifiant
function trouverParId(apprenants, id) {
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
      return apprenants[i];
    }
  }
  return null;
}
 
// 6. Ajoute le résultat d'une journée, ou le remplace s'il existe déjà
function enregistrerResultat(apprenants, id, jour, exercicesTermines, totalExercices, challengeTermine) {
  let valide = validerResultat(jour, exercicesTermines, totalExercices);
  if (!valide) {
    return false;
  }
 // On cherche l'apprenant correspondant à l'identifiant fourni
  let apprenant = trouverParId(apprenants, id);
  if (!apprenant) {
    console.log("Erreur : apprenant introuvable.");
    return false;
  }
 // On vérifie si le jour est déjà présent dans les résultats de l'apprenant
  let journeeDejaPresente = false;
  for (let i = 0; i < apprenant.resultats.length; i++) {
    if (apprenant.resultats[i].jour === jour) {
      apprenant.resultats[i].exercicesTermines = exercicesTermines;
      apprenant.resultats[i].totalExercices = totalExercices;
      apprenant.resultats[i].challengeTermine = challengeTermine;
      journeeDejaPresente = true;
    }
  }
 // Si le jour n'est pas déjà présent, on ajoute un nouvel objet résultat
  if (!journeeDejaPresente) {
    apprenant.resultats.push({
      jour: jour,
      exercicesTermines: exercicesTermines,
      totalExercices: totalExercices,
      challengeTermine: challengeTermine
    });
  }
 // On calcule la progression globale de l'apprenant après l'ajout du résultat
  let prog = calculerProgression(apprenant);
  console.log("Résultat du jour " + jour + " enregistré pour " + apprenant.nomComplet + ".");
  console.log(apprenant.nomComplet + " : " + prog.totalTermines + "/" + prog.totalProposes + " exercices, progression " + prog.pourcentage + "%.");
  console.log(prog.journeesRenseignees + " journées renseignées, " + prog.challengesTermines + " challenges terminés.");
  return true;
}

// 7. Recherche un apprenant avec tout ou partie de son nom (sans casse)
function rechercherParNom(apprenants, terme) {
  let resultats = [];
  let termeRecherche = terme.trim().toLowerCase();
  for (let i = 0; i < apprenants.length; i++) {
    let nom = apprenants[i].nomComplet.toLowerCase();
    if (nom.includes(termeRecherche)) {
      resultats.push(apprenants[i]);
    }
  }
  return resultats;
}
// 8. Trie une copie de la liste par ordre alphabétique du nom
function trierParAlphabet(apprenants) {
  let copie = apprenants.slice();
  copie.sort(function (a, b) {
    return a.nomComplet.localeCompare(b.nomComplet);
  });
  return copie;
}

// 9. Filtre les apprenants par niveau de progression
function filtrerParNiveau(apprenants, niveauVoulu) {
  let resultats = [];
  for (let i = 0; i < apprenants.length; i++) {
    let prog = calculerProgression(apprenants[i]);
    if (prog.niveau.toLowerCase() === niveauVoulu.trim().toLowerCase()) {
      resultats.push(apprenants[i]);
    }
  }
  return resultats;
}

// 10. Trie une copie de la liste, du pourcentage le plus haut au plus bas
function trierParProgression(apprenants) {
  let copie = apprenants.slice();
  copie.sort(function (a, b) {
    let progA = calculerProgression(a).pourcentage;
    let progB = calculerProgression(b).pourcentage;
    return progB - progA;
  });
  return copie;
}

// 11. Affiche le tableau de bord complet du groupe
function afficherTableauDeBord(apprenants) {
  console.log("\n========================================");
  console.log("      TABLEAU DE BORD - SAS CONSOLE");
  console.log("========================================");
  console.log("Nombre total d'apprenants : " + apprenants.length);
 
  let listeTriee = trierParProgression(apprenants);
  let totalPourcentages = 0;
  let nombreSolide = 0;
  let nombreEnProgression = 0;
  let nombreARenforcer = 0;
 
  for (let i = 0; i < listeTriee.length; i++) {
    let apprenant = listeTriee[i];
    let prog = calculerProgression(apprenant);
    totalPourcentages = totalPourcentages + prog.pourcentage;
 
    if (prog.niveau === "Solide") {
      nombreSolide++;
    } else if (prog.niveau === "En progression") {
      nombreEnProgression++;
    } else {
      nombreARenforcer++;
    }
 
    // On cherche les jours (1 à 7) qui n'ont pas encore de résultat
    let joursRenseignes = [];
    for (let j = 0; j < apprenant.resultats.length; j++) {
      joursRenseignes.push(apprenant.resultats[j].jour);
    }
    let joursManquants = [];
    for (let jour = 1; jour <= 7; jour++) {
      if (joursRenseignes.indexOf(jour) === -1) {
        joursManquants.push(jour);
      }
    }
 // On affiche les informations de l'apprenant
    console.log(
      "- " + apprenant.nomComplet + " (" + apprenant.ville + ") : " +
      prog.totalTermines + "/" + prog.totalProposes + " (" + prog.pourcentage + "%) | " +
      "Niveau : " + prog.niveau + " | Jours manquants : [" + joursManquants.join(", ") + "] | " +
      "Challenges terminés : " + prog.challengesTermines
    );
  }
 // On calcule la moyenne de progression du groupe
  let moyenneGroupe = 0;
  if (apprenants.length > 0) {
    moyenneGroupe = Math.round(totalPourcentages / apprenants.length);
  }
 
  console.log("----------------------------------------");
  console.log("Progression moyenne du groupe : " + moyenneGroupe + "%");
  console.log("Solide : " + nombreSolide + " | En progression : " + nombreEnProgression + " | À renforcer : " + nombreARenforcer);
  console.log("========================================\n");
}
// Exportation des fonctions pour utilisation dans d'autres modules
module.exports = {
  normaliserNom,
  validerResultat,
  calculerProgression,
  ajouterApprenant,
  trouverParId,
  enregistrerResultat,
  rechercherParNom,
  trierParProgression,
  trierParAlphabet,
  afficherTableauDeBord,
  filtrerParNiveau
};

