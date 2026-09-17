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

// 1. normaliserNom : Nettoyer et uniformiser un nom
function normaliserNom(nom) {
  if (!nom) return "";
  let propre = nom.trim().toLowerCase();
  let mots = propre.split(" ");
  let resultat = "";
  for (let i = 0; i < mots.length; i++) {
    if (mots[i].length > 0) {
      resultat +=mots[i].slice(1) + " ";
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
