const express = require('express');
const router = express.Router();
const db = require('../db');

// Listare produse (cu sau fără categorie)
router.get('/', async (req, res) => {
    const categorie = req.query.categorie;
    let produse;

    try {
        if (categorie) {
            produse = await db.any('SELECT * FROM artworks WHERE categorie_mare = $1', [categorie]);
        } else {
            produse = await db.any('SELECT * FROM artworks');
        }

        const categorii = await db.any('SELECT DISTINCT categorie_mare FROM artworks');
        res.render('produse', { produse, categorii });
    } catch (err) {
        res.status(500).send('Eroare la încărcarea produselor');
    }
});

// Pagina individuală
router.get('/:id', async (req, res) => {
    try {
        const produs = await db.one('SELECT * FROM artworks WHERE id = $1', [req.params.id]);
        res.render('produs', { produs });
    } catch (err) {
        res.status(404).send('Produsul nu a fost găsit');
    }
});

module.exports = router;
