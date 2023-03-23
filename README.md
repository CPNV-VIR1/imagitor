# IMIGATOR

## Text to Image Server

Ce projet est un serveur Node.js simple qui permet de convertir un texte en image. Le serveur accepte une requête POST contenant un texte, génère une image avec ce texte et enregistre l'image sur le serveur. Il expose également des routes pour récupérer la liste des images sauvegardées et pour récupérer une image spécifique en utilisant son nom.

## Prérequis

- Node.js (version recommandée 14.x ou supérieure)
- NPM (généralement inclus avec Node.js)

## Installation

1. Clonez le dépôt git :
   
```
git clone https://github.com/CPNV-RIA1/imagitor.git imaginator
```

2. Accédez au dossier du projet :
```
cd imaginator
```

3. Installez les dépendances :
```
    npm install
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

## Authors

Yannick Perret\
Jessy Borcard




