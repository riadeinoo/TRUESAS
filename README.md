SAS Progress ConsoleUne application en ligne de commande (CLI) construite avec Node.js conçue pour gérer, suivre et analyser la progression quotidienne des exercices, les défis validés et les niveaux de performance globaux des apprenants au sein d'un programme de formation.
🚀 FonctionnalitésSystème de menu interactif : Alimenté par readline/promises pour une navigation fluide dans le terminal.
Gestion des apprenants : Ajout de nouveaux apprenants avec prévention des doublons d'identifiants, capitalisation automatique des noms et normalisation des villes.
Suivi quotidien : Enregistrement ou mise à jour des résultats d'exercices journaliers (jours 1 à 7) avec validation intégrée.
Évaluation automatique : Classe les apprenants en trois niveaux de performance selon leur pourcentage de réussite :🟢 Solide ($\ge 80\%$)🟡 En progression ($50\% - 79\%$)🔴 À renforcer ($< 50\%$)
Recherche et tri avancés : Recherche par nom, filtrage par niveau, ou tri des listes par ordre alphabétique et par progression décroissante.Tableau de bord complet : Génère un aperçu global du groupe affichant les moyennes totales, les métriques individuelles et les jours non renseignés.
📂 Structure du Projetcode.js (Logique métier) : Contient la validation des données, la normalisation, les algorithmes de calcul et les fonctions utilitaires de manipulation de tableaux.
index.js (Point d'entrée) : Gère l'interface utilisateur en ligne de commande (CLI), les invites de saisie et la boucle interactive principale.
⚙️ PrérequisAssurez-vous d'avoir Node.js installé sur votre machine.
📦 Installation et Utilisation
Téléchargez ou placez les fichiers du projet dans un répertoire local.
Ouvrez votre terminal dans le dossier du projet et lancez l'application :Bashnode index.js
Suivez les instructions du menu à l'écran en entrant le numéro correspondant (de 0 à 9) pour interagir avec le système.
