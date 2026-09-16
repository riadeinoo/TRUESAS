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


// Function to parse an integer from a string or number
function parseEntier(valeur) {
  if (typeof valeur === "number") {         // Check if the input is a number
    return Number.isInteger(valeur) ? valeur : NaN; // Return the number if it's an integer, otherwise return NaN
  }
  if (typeof valeur !== "string" || valeur.trim() === "") return NaN;  // Check if the input is a non-empty string
  const nombre = Number(valeur.trim());                // Convert the trimmed string to a number
  return Number.isInteger(nombre) ? nombre : NaN;    // Return the number if it's an integer, otherwise return NaN
}

function parseBooleen(valeur) {
  const texte = normaliserTexte(valeur);   // Normalize the input value
  if (["oui", "o", "yes", "y", "true", "1"].includes(texte)) return true;   // Check if the normalized text is in the list of true values
  if (["non", "n", "no", "false", "0"].includes(texte)) return false;   // Check if the normalized text is in the list of false values
  return null; // Return null if the input value doesn't match any true or false values
}


// Constants for validation
const JOUR_MIN = 1;
const JOUR_MAX = 7;
// Function to validate the result of an apprenant for a specific day
function validerResultat(jour, exercicesTermines, totalExercices, challengeTermine) {
  const j = parseEntier(jour);
  const et = parseEntier(exercicesTermines);
  const tt = parseEntier(totalExercices);
// Validate the inputs
  if (Number.isNaN(j) || j < JOUR_MIN || j > JOUR_MAX) {    // Check if the day number is valid
    return { valide: false, erreur: `Le numéro du jour doit être un entier compris entre ${JOUR_MIN} et ${JOUR_MAX}.` }; 
  }
  if (Number.isNaN(tt) || tt <= 0) {  // Check if the total number of exercises is valid
    return { valide: false, erreur: "Le total d'exercices proposés doit être un entier supérieur à 0." };
  }
  if (Number.isNaN(et) || et < 0) {  // Check if the number of completed exercises is valid
    return { valide: false, erreur: "Le nombre d'exercices terminés doit être un entier positif ou nul." };
  }
  if (et > tt) { // Check if the number of completed exercises exceeds the total number of exercises
    return { valide: false, erreur: "Le nombre d'exercices terminés ne peut pas dépasser le nombre d'exercices proposés." };
  }
  if (typeof challengeTermine !== "boolean") { // Check if the challenge status is a boolean
    return { valide: false, erreur: "Le statut du challenge doit être un booléen (oui / non)." };
  }

  return { valide: true, jour: j, exercicesTermines: et, totalExercices: tt }; // Return the validated result if all checks pass    
}




function genererId() {
  return apprenants.reduce((max, a) => Math.max(max, a.id), 0) + 1; // Find the maximum existing ID and add 1 to generate a new unique ID
}

function ajouterApprenant(id, nomComplet, ville) { // Function to add a new apprenant
  const identifiant = (typeof id === "string" && id.trim() === "") ? genererId() : parseEntier(id); // Generate a new ID if the input ID is an empty string, otherwise parse the input ID

  if (Number.isNaN(identifiant) || identifiant <= 0) {  // Check if the parsed ID is a valid positive integer
    return { succes: false, erreur: "L'identifiant doit être un entier supérieur à 0 (ou vide pour une attribution automatique)." }; // Return an error if the ID is invalid
  }
  if (apprenants.some(a => a.id === identifiant)) {   // Check if an apprenant with the same ID already exists
    return { succes: false, erreur: `Un apprenant avec l'identifiant ${identifiant} existe déjà.` }; // Return an error if the ID is already taken
  }
  if (typeof nomComplet !== "string" || nomComplet.trim() === "") {  // Check if the full name is a non-empty string
    return { succes: false, erreur: "Le nom complet est obligatoire." };  // Return an error if the full name is missing
  }
}

