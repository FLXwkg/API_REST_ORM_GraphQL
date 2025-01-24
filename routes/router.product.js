const multer = require('multer');
const express = require('express');
const path = require("path");
const fs = require("fs");
const ProductService = require("../services/ProductService");

const router = express.Router();
const storage = multer.diskStorage({
    destination: '.tmp/',
    filename: (req, file, cbk) => {
        cbk(null, req.params.id + ".png");
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cbk) => {
        if (file.mimetype === "image/png") {
            cbk(null, true);
        } else {
            cbk("Format invalide", false);
        }
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID du produit
 *         name:
 *           type: string
 *           description: Nom du produit
 *           example: "Produit A"
 *         description:
 *           type: string
 *           description: Description du produit
 *           example: "Une description du produit"
 *         creation_date:
 *           type: string
 *           format: date-time
 *           description: Date de création du produit
 *         update_date:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour du produit
 *         price:
 *           type: number
 *           description: Prix du produit
 *           example: 100.50
 */

/**
 * @swagger
 * /product/:
 *   get:
 *     summary: Récupère la liste des produits
 *     parameters:
 *       - in: query
 *         name: sort
 *         description: Champ pour trier les produits
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         description: Ordre du tri, ascendant ou descendant
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *       - in: query
 *         name: filters
 *         description: Filtres JSON pour rechercher des produits
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Nombre maximum de produits à retourner
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: Page des résultats à afficher
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des produits retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID du produit
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nom du produit
 *                     example: "Produit A"
 */

router.get('/', async (req, res) => {
    let products = await ProductService.listProducts(req.query.sort, req.query.order, req.query.filters, req.query.limit, req.query.page);
    res.json(products);
});

/**
 * @swagger
 * /product/:
 *   post:
 *     summary: Crée un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/", async (req, res) => {
    let product = await ProductService.createProduct(req.body);
    res.status(201).json(product);
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Récupère un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit retourné avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get("/:id", async (req, res) => {
    let product = await ProductService.getProduct(req.params.id);
    res.json(product);
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Met à jour un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 */
router.put("/:id", async (req, res) => {
    let product = await ProductService.updateProduct(req.params.id, req.body);
    res.json(product);
});

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Supprime un produit par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 */
router.delete("/:id", async (req, res) => {
    let product = await ProductService.deleteProduct(req.params.id);
    res.json(product);
});

/**
 * @swagger
 * /product/{id}/image:
 *   put:
 *     summary: Ajoute ou met à jour l'image d'un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image PNG du produit
 *     responses:
 *       200:
 *         description: Image ajoutée/mise à jour avec succès
 */
router.put("/:id/image", upload.single('photo'), async (req, res) => {
    console.log(req.file);
    res.end();
});

/**
 * @swagger
 * /product/{id}/image:
 *   get:
 *     summary: Récupère l'image d'un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: Image retournée avec succès
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/:id/image", async (req, res) => {
    const imagePath = path.join(".tmp", req.params.id + ".png");
    const filestream = fs.createReadStream(imagePath);
    res.setHeader('Content-type', "image/png");
    filestream.pipe(res);
});

module.exports = router;
