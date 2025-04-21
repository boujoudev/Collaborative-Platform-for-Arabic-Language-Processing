# Tests Postman pour la Plateforme Collaborative

## 1. Authentification

### Register (Création de compte)
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/users/register`
- **Headers** : 
  ```
  Content-Type: application/json
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }
  ```

### Login (Connexion)
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/users/login`
- **Headers** : 
  ```
  Content-Type: application/json
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Note** : Sauvegarder le token JWT reçu pour les requêtes suivantes

## 2. Gestion des Projets

### Créer un Projet
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/projects`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Mon Projet Test",
    "description": "Description de mon projet test",
    "visibility": "public",
    "status": "ongoing"
  }
  ```

### Supprimer un Projet
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/projects/ID_DU_PROJET`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 3. Gestion des Fichiers

### Uploader un Fichier pour un Projet
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/files/upload/project/ID_DU_PROJET`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (form-data) :
  - Clé : `file`
  - Valeur : Sélectionner le fichier (type : File)

### Uploader un Corpus
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/files/upload/corpus/ID_DU_CORPUS`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (form-data) :
  - Clé : `file`
  - Valeur : Sélectionner le fichier (type : File)

### Uploader une Annotation
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/files/upload/annotation/ID_DU_CORPUS`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (form-data) :
  - Clé : `file`
  - Valeur : Sélectionner le fichier (type : File)

### Uploader un Fichier pour un Cours
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/files/upload/course/ID_DU_COURS`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (form-data) :
  - Clé : `file`
  - Valeur : Sélectionner le fichier (type : File)

### Télécharger un Fichier
- **Méthode** : GET
- **URL** : `http://localhost:3000/api/files/download/NOM_DU_FICHIER`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

### Supprimer un Fichier
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/files/delete/NOM_DU_FICHIER`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 4. Gestion des Corpus

### Créer un Corpus
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/corpus`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Mon Corpus Test",
    "description": "Description de mon corpus test",
    "language": "ar",
    "type": "text",
    "visibility": "public",
    "tags": ["tag1", "tag2"]
  }
  ```

### Mettre à jour un Corpus
- **Méthode** : PUT
- **URL** : `http://localhost:3000/api/corpus/ID_DU_CORPUS`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Nouveau titre",
    "description": "Nouvelle description",
    "tags": ["nouveau_tag"]
  }
  ```

### Supprimer un Corpus
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/corpus/ID_DU_CORPUS`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 5. Gestion des Publications

### Créer une Publication
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/publications`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Titre de la publication",
    "abstract": "Résumé de la publication",
    "content": "Contenu détaillé de la publication",
    "authors": ["Auteur 1", "Auteur 2"],
    "keywords": ["mot-clé1", "mot-clé2"],
    "status": "draft",
    "project_id": "ID_DU_PROJET"
  }
  ```

### Mettre à jour une Publication
- **Méthode** : PUT
- **URL** : `http://localhost:3000/api/publications/ID_DE_LA_PUBLICATION`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Nouveau titre",
    "status": "published",
    "keywords": ["nouveau_mot_clé"]
  }
  ```

### Supprimer une Publication
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/publications/ID_DE_LA_PUBLICATION`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 6. Gestion des Cours

### Créer un Cours
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/courses`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Titre du cours",
    "description": "Description du cours",
    "level": "beginner",
    "language": "ar",
    "duration": 60,
    "tags": ["tag1", "tag2"]
  }
  ```

### Mettre à jour un Cours
- **Méthode** : PUT
- **URL** : `http://localhost:3000/api/courses/ID_DU_COURS`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "title": "Nouveau titre",
    "description": "Nouvelle description",
    "level": "intermediate"
  }
  ```

### Supprimer un Cours
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/courses/ID_DU_COURS`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 7. Gestion des Annotations

### Créer une Annotation
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/annotations`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "corpus_id": "ID_DU_CORPUS",
    "content": "Contenu de l'annotation",
    "type": "comment",
    "start_position": 0,
    "end_position": 100,
    "tags": ["tag1", "tag2"]
  }
  ```

### Mettre à jour une Annotation
- **Méthode** : PUT
- **URL** : `http://localhost:3000/api/annotations/ID_DE_L_ANNOTATION`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "content": "Nouveau contenu",
    "tags": ["nouveau_tag"]
  }
  ```

### Supprimer une Annotation
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/api/annotations/ID_DE_L_ANNOTATION`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## 8. Chatbot

### Envoyer un Message au Chatbot
- **Méthode** : POST
- **URL** : `http://localhost:3000/api/chatbot`
- **Headers** : 
  ```
  Content-Type: application/json
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```
- **Body** (raw - JSON) :
  ```json
  {
    "message": "Votre message au chatbot",
    "context": {
      "project_id": "ID_DU_PROJET",
      "user_id": "ID_UTILISATEUR"
    }
  }
  ```

### Messagerie Firebase 
   - Envoyer un message :
   POST /api/messages
   {
       "receiver_id": "1",
       "content": "Test message"
   }

   - Recevoir un message :
      GET /api/messages/Id du messager 
      



### Obtenir l'Historique des Messages
- **Méthode** : GET
- **URL** : `http://localhost:3000/api/chatbot/history`
- **Headers** : 
  ```
  Authorization: Bearer VOTRE_TOKEN_JWT
  ```

## Notes Importantes

1. **Authentification** :
   - Toutes les routes (sauf register et login) nécessitent un token JWT valide
   - Le token doit être inclus dans le header `Authorization` avec le préfixe `Bearer`

2. **Gestion des Fichiers** :
   - Les fichiers sont stockés dans le dossier `uploads`
   - Les types de fichiers autorisés sont : PDF, DOC, DOCX, TXT, CSV, JSON, XML
   - La taille maximale des fichiers est de 10MB
   - Les fichiers sont organisés par type d'entité (project, corpus, course, annotation)

3. **Gestion des Projets** :
   - Un projet doit exister avant d'y uploader des fichiers
   - La suppression d'un projet supprime également tous ses fichiers

4. **Gestion des Corpus** :
   - Un corpus doit exister avant d'y uploader des fichiers ou des annotations
   - Les annotations sont liées à un corpus spécifique

5. **Gestion des Publications** :
   - Une publication doit être associée à un projet
   - Les publications peuvent avoir différents statuts : draft, review, published
   - Les publications peuvent être annotées et commentées

6. **Gestion des Cours** :
   - Les cours peuvent être organisés par niveau (beginner, intermediate, advanced)
   - Les cours peuvent inclure des fichiers de support
   - Les cours peuvent être associés à des projets ou des corpus

7. **Gestion des Annotations** :
   - Les annotations sont liées à un corpus spécifique
   - Les annotations peuvent être de différents types (comment, highlight, correction)
   - Les annotations peuvent inclure des positions de début et de fin dans le texte

8. **Chatbot** :
   - Le chatbot nécessite un contexte (project_id et user_id) pour fonctionner correctement
   - L'historique des messages est lié à l'utilisateur authentifié 