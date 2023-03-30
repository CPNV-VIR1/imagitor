# IMIGATOR

## Text to Image Server

Ce projet est un serveur Node.js simple qui permet de convertir un texte en image. Le serveur accepte une requête POST contenant un texte, génère une image avec ce texte et enregistre l'image sur le serveur. Il expose également des routes pour récupérer la liste des images sauvegardées et pour récupérer une image spécifique en utilisant son nom.

## Prérequis

- Node.js (version recommandée 14.x ou supérieure)
- NPM (généralement inclus avec Node.js)
- MySQL (version MySQL 5.5 minimum, est installé dans la suite du readme)

## Installation

run this command in the root folder, and then navigate to the backend folder and run the same command
```
npm i
```
## Running

### Frontend

to run the frontend, run this command, in the root folder
```
npm run dev
```

### Backend
to run the backend, run this command, in the root folder
```
npm run serve
```

Le serveur est maintenant en écoute sur le port 5000 (ou le port spécifié dans le fichier server.js).

### Tests

Pour lancer les tests :

```
npm run test
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
│   tree.txt
│   vite.config.js
│   
├───.idea
│       .gitignore
│       imagitor.iml
│       modules.xml
│       vcs.xml
│       workspace.xml
│       
├───backend
│   │   .env
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
│   │   index.html
│   │   
│   └───assets
│           index-0b93f2c6.css
│           main-fa16bf7f.js
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
- POST /image: Génère une image à partir du texte fourni et l'enregistre sur le serveur.
- GET /image: Récupère la liste des images sauvegardées sur le serveur.
- GET /image/{name}: Récupère une image spécifique en utilisant son nom.


## Erreur connue
Une erreur avec la librairie canvas (pour le backend) est possible si vous n'avez pas toutes les dépendances installé en amont.
Veuillez-vous référer à la page du wiki de la librairie, disponible [ici le wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)


## Répartition des tâches

Front-end (sauf système de langage), backend (api + transformation image), stockage : Yannick Perret

Front-end(système de langage), Tests end to end, unitaires, github action : Jessy Brocard

## Authors

Yannick Perret\
Jessy Borcard




