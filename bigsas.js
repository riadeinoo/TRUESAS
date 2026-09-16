// STUDENT DATA
const apprenants = [
  {
    id: 1,
    nomComplet: "Sara Dev",
    ville: "Nador",
    resultats: [
      { jour: 1, exercicesTermines: 18, totalExercices: 20, challengeTermine: true },
      { jour: 2, exercicesTermines: 14, totalExercices: 20, challengeTermine: false }
    ]
  },
  {
    id: 2,
    nomComplet: "Yassine Code",
    ville: "Oujda",
    resultats: [
      { jour: 1, exercicesTermines: 12, totalExercices: 20, challengeTermine: false }
    ]
  }
];

// Function to normalize text
function normaliserTexte(texte) {
  if (typeof texte !== "string") return "";    // Check if the input is a string
  return texte                                 
    .trim()                             // Remove leading and trailing whitespace
    .toLowerCase()                     // Convert to lowercase
    .normalize("NFD")                  // Decompose combined letters into base letters
    .replace(/[\u0300-\u036f]/g, "")   // Remove accents
    .replace(/\s+/g, " ");            // Replace multiple spaces with a single space
}
