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
