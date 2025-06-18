# Gestion des Catégories et Produits

## Description

Ce projet est une API que j'ai construite avec **Node.js**, **Express**, et **MySQL** permettant de gérer des catégories et des produits. Elle offre des fonctionnalités CRUD pour les catégories et les produits.

---

## Prérequis

- **Node.js**
- **MySQL**
- **Postman** (ou tout autre outil)

---

## Comment installer ?

### 1. Cloner le projet

Clonez ce dépôt Git sur votre machine :

```bash
git clone https://github.com/beyegb1n/api-produits.git
cd api-produits
```

### 2. Installer les dépendances

Installez les packages nécessaires avec **npm** :

```bash
npm install
```

### 3. Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet.
2. Ajoutez les variables suivantes dans ce fichier :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=<nom_de_votre_base>
DB_PORT=3306
```

- **DB_HOST** : Adresse du serveur MySQL (par défaut : `localhost`)
- **DB_USER** : Nom d'utilisateur MySQL (par défaut : `root`)
- **DB_PASSWORD** : Mot de passe MySQL (laissez vide si pas de mot de passe)
- **DB_NAME** : Nom de la base de données utilisée
- **DB_PORT** : Port de MySQL (par défaut : `3306`)

### 4. Configurer la base de données

1. Créez une base de données dans MySQL avec le nom défini dans le fichier `.env` :
   ```sql
   CREATE DATABASE <nom_de_votre_bdd>;
   ```
2. Importez les tables pour les catégories et produits en exécutant les commandes SQL suivantes :

#### Création des tables :

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

#### Ajouter des exemples de données :

```sql
INSERT INTO categories (name) VALUES
('Informatique'),
('Électroménager'),
('Vêtements');

INSERT INTO products (name, price, category_id) VALUES
('Ordi portable',799.99, 1),
('Aspirateur Dyson', 299.99, 2),
('T-shirt oversize', 19.99, 3),
```

---

## Lancer le projet

Pour démarrer le serveur Node.js, exécutez la commande suivante :

```bash
npm run dev
```

- Le serveur écoute sur **http://localhost:3000**.

---

## Fonctionnalités de l'API

### Catégories

1. **Lister les catégories** :
   - **GET** `/categories`
2. **Ajouter une catégorie** :
   - **POST** `/categories`
   - **Body JSON** :
     ```json
     {
       "name": "Nom de la catégorie"
     }
     ```
3. **Modifier une catégorie** :
   - **PUT** `/categories/:id`
   - **Body JSON** :
     ```json
     {
       "name": "Nouveau nom"
     }
     ```
4. **Supprimer une catégorie** :
   - **DELETE** `/categories/:id`

### Produits

1. **Lister les produits** :
   - **GET** `/products`
2. **Ajouter un produit** :
   - **POST** `/products`
   - **Body JSON** :
     ```json
     {
       "name": "Nom du produit",
       "category_id": 1
     }
     ```
3. **Modifier un produit** :
   - **PUT** `/products/:id`
   - **Body JSON** :
     ```json
     {
       "name": "Nouveau nom",
       "category_id": 1
     }
     ```
4. **Supprimer un produit** :
   - **DELETE** `/products/:id`

---

## Tester l'API

Vous pouvez utiliser **Postman** ou tout autre client HTTP pour tester les routes de l'API en suivant les fonctionnalités ci-dessus.

---

## Auteur

**Kouassi Emmanuel**
