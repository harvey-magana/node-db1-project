const express = require('express');

const Accounts = require('./accounts-model.js');

const router = express.Router();

router.get('/', async (req, res, next) => { 
    try {
        const data = await Accounts.get()
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.status(200).json(req.account);
    } catch(err) {
        next(err);
    }
});

// router.get('/:id', (req, res) => { });
// router.post('/', (req, res) => { });
// router.put('/:id', (req, res) => { });
// router.delete('/:id', (req, res) => { });

module.exports = router;