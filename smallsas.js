const apprenants = [
  {
    id: 1,
    nomComplet: "Sara Dev",
    ville: "Nador",
    resultats: [
      { jour: 1, exercicesTermines: 18,
        totalExercices: 20, challengeTermine: true },
      { jour: 2, exercicesTermines: 14,
        totalExercices: 20, challengeTermine: false }
    ]
  },
  {
    id: 2,
    nomComplet: "Yassine Code",
    ville: "Oujda",
    resultats: [
      { jour: 1, exercicesTermines: 12,
        totalExercices: 20, challengeTermine: false }
    ]
  }
];

// 1. normaliserNom : Nettoyer sans majuscules forcées
function normaliserNom(nom) {
  if (!nom) return "";
  let propre = nom.trim().toLowerCase();
  let mots = propre.split(" ");
  let resultat = "";
  for (let i = 0; i < mots.length; i++) {
    if (mots[i].length > 0) {
      resultat += mots[i] + " ";
    }
  }
  return resultat.trim();
}

// 2. validerResultat : Vérifier les valeurs d'un résultat journalier
function validerResultat(jour, exercicesTermines, totalExercices) {
  if (jour < 1 || jour > 7) {
    console.log("Erreur : Le numéro du jour doit être compris entre 1 et 7.");
    return false;
  }
  if (exercicesTermines < 0 || totalExercices <= 0) {
    console.log("Erreur : Les nombres d'exercices doivent être positifs.");
    return false;
  }
  if (exercicesTermines > totalExercices) {
    console.log("Erreur : Le nombre d'exercices terminés ne peut pas dépasser le total proposé.");
    return false;
  }
  return true;
}

// 3. calculerProgression : Produire les indicateurs individuels
function calculerProgression(apprenant) {
  let totalTermines = 0;
  let totalProposes = 0;
  let challengesTermines = 0;
  let journeesRenseignees = apprenant.resultats.length;

  for (let i = 0; i < apprenant.resultats.length; i++) {
    let res = apprenant.resultats[i];
    totalTermines += res.exercicesTermines;
    totalProposes += res.totalExercices;
    if (res.challengeTermine) {
      challengesTermines++;
    }
  }

  let pourcentage = totalProposes === 0 ? 0 : Math.round((totalTermines / totalProposes) * 100);

  let niveau = "À renforcer";
  if (pourcentage >= 80) {
    niveau = "Solide";
  } else if (pourcentage >= 50) {
    niveau = "En progression";
  }
  return {
    totalTermines,
    totalProposes,
    pourcentage,
    challengesTermines,
    journeesRenseignees,
    niveau
  };
}

// 4. ajouterApprenant : Ajouter en contrôlant les doublons d'ID
function ajouterApprenant(id, nomComplet, ville) {
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
      console.log("Erreur : Cet identifiant existe déjà.");
      return false;
    }
  }
  apprenants.push({
    id: id,
    nomComplet: normaliserNom(nomComplet),
    ville: ville ? ville.trim() : "",
    resultats: []
  });
  console.log("Apprenant ajouté avec succès !");
  return true;
}

// 5. enregistrerResultat : Ajouter ou mettre à jour une journée
function enregistrerResultat(id, jour, exercicesTermines, totalExercices, challengeTermine) {
  if (!validerResultat(jour, exercicesTermines, totalExercices)) return false;

  let cible = null;
  for (let i = 0; i < apprenants.length; i++) {
    if (apprenants[i].id === id) {
      cible = apprenants[i];
      break;
    }
  }

  if (!cible) {
    console.log("Erreur : Apprenant non trouvé.");
    return false;
  }

  let jourExiste = false;
  for (let i = 0; i < cible.resultats.length; i++) {
    if (cible.resultats[i].jour === jour) {
      cible.resultats[i].exercicesTermines = exercicesTermines;
      cible.resultats[i].totalExercices = totalExercices;
      cible.resultats[i].challengeTermine = challengeTermine;
      jourExiste = true;
      break;
    }
  }

  if (!jourExiste) {
    cible.resultats.push({ jour, exercicesTermines, totalExercices, challengeTermine });
  }

  console.log("Résultat du jour " + jour + " enregistré pour " + cible.nomComplet + ".");
  let prog = calculerProgression(cible);
  console.log(cible.nomComplet + ": " + prog.totalTermines + "/" + prog.totalProposes + " exercices, progression " + prog.pourcentage + "%.");
  console.log(prog.journeesRenseignees + " journées renseignées, " + prog.challengesTermines + " challenges terminés.");
  return true;
}
