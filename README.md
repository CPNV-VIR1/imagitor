# IMIGATOR

## Text to Image Server

Ce projet est un serveur Node.js simple qui permet de convertir un texte en image. Le serveur accepte une requête POST contenant un texte, génère une image avec ce texte et enregistre l'image sur le serveur. Il expose également des routes pour récupérer la liste des images sauvegardées et pour récupérer une image spécifique en utilisant son nom.

## Prérequis

- Node.js (version recommandée 14.x ou supérieure)
- NPM (généralement inclus avec Node.js)

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
```
npm run dev
```

### Backend
- Démarrez le serveur nodejs :
```
npm run serve
```

Le serveur est maintenant en écoute sur le port 5000 (ou le port spécifié dans le fichier server.js).

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




