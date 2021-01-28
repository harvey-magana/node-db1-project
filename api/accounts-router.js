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

router.get('/:id', checkId, async (req, res, next) => {
    try {
        const data = await Accounts.getById(req.params.id)
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

router.post('/', checkPayload, async (req, res, next) => {
    const body = req.body;
    try {
        const data = await Accounts.insert(body);
        res.json(data);
    } catch(err) {
        next(err);
    }
});

// router.get('/:id', (req, res) => { });
// router.post('/', (req, res) => { });
// router.put('/:id', (req, res) => { });
// router.delete('/:id', (req, res) => { });

async function checkId(req, res, next) {
    const { id } = req.params;
    try{
        const account = await Accounts.getById(id);
        if(account) {
            req.account = account;
            next();
        } else {
            const err = new Error('invalid');
            err.statusCode = 400;
            next(err);
        }
    } catch(err) {
        err.statusCode = 500;
        err.message = 'Error retrieving an account';
        next(err);
    }
}

async function checkPayload(req, res, next) {
    const body = req.body;
    if(!body.name || !body.budget) {
        const err = new Error('body must include a title and a budget.');
        err.statusCode = 400;
        next(err);
    } else {
        next();
    }
}

module.exports = router;