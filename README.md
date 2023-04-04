# IMIGATOR

## Text to Image Server

Ce projet est un serveur Node.js simple qui permet de convertir un texte en image. Le serveur accepte une requête POST contenant un texte, génère une image avec ce texte et enregistre l'image sur le serveur. Il expose également des routes pour récupérer la liste des images sauvegardées et pour récupérer une image spécifique en utilisant son nom.

## Prérequis

- Node.js (version recommandée 14.x ou supérieure)
- NPM (généralement inclus avec Node.js)
- MySQL (version MySQL 5.5 minimum, est installé dans la suite du readme)

## Installation

1. Clonez le dépôt git :
   
```
git clone https://github.com/CPNV-RIA1/imagitor.git imagitor
```

2. Accédez au dossier du projet :
```
cd imagitor
```

3. Installez les dépendances :
```
npm install
```

### Configuration de la base de données MariaDB
Ce projet utilise MariaDB comme base de données pour stocker les informations sur les images générées. Voici les étapes à suivre pour configurer MariaDB pour votre projet :

1. Installez MariaDB
Si vous n'avez pas déjà MariaDB installé sur votre système, vous pouvez le télécharger et l'installer à partir de [leur site officiel](https://mariadb.org/download/).

2. Configurez les variables d'environnement
Créez un fichier .env.local ou copier l'exemple .env.exemple dans le dossier ./backend avec les informations de connexion à la base de données. Voici un exemple de fichier .env.local :

```bash
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_DATABASE=imagitor
DATABASE_ENGINE=mysql
```

## Utilisation

### Frontend

- Démarrez le serveur frontend
```js
npm run dev
```

Resultat :
```js
> imagitor@0.0.0 dev
> vite

  VITE v4.1.4  ready in 242 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  press h to show help
```

### Backend
- Démarrez le serveur nodejs :
```js 
npm run serve
```

Resultat :
```js 
> imagitor@0.0.0 serve
> node backend/server.js

Serveur démarré sur le port 5000
Base de données vérifiée et créée si elle n'existait pas.
Connexion à la base de données établie avec succès.
Le modèle a été synchronisé avec la base de données.
```

Le serveur est maintenant en écoute sur le port 5000 (ou le port spécifié dans le fichier server.js).

### Tests

Pour lancer les tests :

```
npm run test
```

Résultat :
```
> imagitor@0.0.0 test
> jest

 PASS  tests/imageController.test.js
  ● Console

    console.log
      Base de données vérifiée et créée si elle n'existait pas.

      at log (backend/database/database.js:24:13)

    console.log
      Connexion à la base de données établie avec succès.

      at log (backend/database/database.js:33:13)

    console.log
      Le modèle a été synchronisé avec la base de données.

      at log (backend/database/database.js:35:13)

 PASS  tests/Image.test.js

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.091 s
Ran all test suites.
```

pour lancer un seul test :

```
npm run test Image.test.js
```
Résultat :

```
> imagitor@0.0.0 test
> jest Image.test.js

 PASS  tests/Image.test.js
  Image Model
    √ Image should be defined (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.619 s, estimated 1 s
Ran all test suites matching /Image.test.js/i.
```
### Collaboration

Afin de pouvoir collaborer au projet, il faut :

- gitflow
    Pour chaque feature, il faut créer une branche, dès que la feature est terminée, il faut ensuite faire une pull request sur develop
    attendre que les github actions passe, et qu'une personne vienne review le code
- conventions de nommage
    Nous utilisons les conventions d'ici : https://www.w3schools.com/js/js_conventions.asp

### structure du code

```
Imagitor.
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   vite.config.js
│        
├───backend
│   │   .env.exemple
│   │   server.js
│   │   
│   ├───assets
│   │   └───images
│   ├───controllers
│   │       imageController.js
│   │       
│   ├───database
│   │       database.js
│   │       
│   └───models
│           image.js
│                  
├───public
│   │   
│   └───assets
│           
└───src
    │   index.html
    │   main.js
    │   
    ├───helpers
    │       function.js
    │       
    ├───lang
    │       fr.json
    │       
    └───scss
            main.scss
            _index.scss
```

## Routes disponibles
- POST /images: Génère une image à partir du texte fourni et l'enregistre sur le serveur.
    - Paramètres
        - text: Texte à utiliser pour créer l'image.
    - Réponse
        - 200 OK : Retourne le chemin de l'image créée.
        - 400 Bad Request : Le texte envoyé est vide ou invalide.
        - 404 Not Found : Seules les requêtes POST sont autorisées.
        - 500 Internal Server Error : Erreur lors de la création ou de l'enregistrement de l'image.

- GET /images: Récupère la liste des images sauvegardées sur le serveur.
  - Réponse :
      - 200 OK : Retourne un tableau JSON contenant les images.
      - 500 Internal Server Error : Erreur lors de la récupération des images.

- GET /images/{imageName} : Récupère une image spécifique en utilisant son nom.
  - Paramètres
    - imageName: Nom de fichier de l'image à récupérer.
  - Réponses
    - 200 OK : Retourne l'image au format PNG.
    - 404 Not Found : L'image demandée n'a pas été trouvée.

## Prise en charge des langues
L'application prend en charge la gestion de plusieurs langues grâce à un système de fichiers JSON pour chaque langue. Le langage utilisé par le navigateur est détecté automatiquement grâce à la fonction navigator.language.

### Ajout d'une nouvelle langue

1. Créez un nouveau fichier JSON avec le nom du code de la langue (par exemple, es-ES.json pour l'espagnol) dans le dossier languages.
2. Copiez le contenu du fichier JSON d'une langue existante (par exemple, fr-FR.json ou en-US.json) et traduisez les valeurs des clés dans la nouvelle langue.
3. Dans le fichier main.js, ajoutez une nouvelle paire clé-valeur dans l'objet ```supportedLanguages``` avec le code de la langue comme clé et le nom de la langue comme valeur (par exemple, 'es-ES': 'Español' pour l'espagnol).
4. L'application détectera et utilisera automatiquement la nouvelle langue ajoutée en fonction des préférences du navigateur de l'utilisateur.

Si la langue du navigateur ne contient pas de fichier de langue associé, la langue En-US sera utilisée par défaut.

## Erreur connue
Une erreur avec la librairie canvas (pour le backend) est possible si vous n'avez pas toutes les dépendances installé en amont.
Veuillez-vous référer à la page du wiki de la librairie, disponible [ici le wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)


## Répartition des tâches

Front-end + système de multi-langages, backend (api + transformation image), stockage : Yannick Perret

Tests end to end, unitaires, github action : Jessy Brocard

## Authors

Yannick Perret\
Jessy Borcard




