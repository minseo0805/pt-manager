const express = require('express');
const bcrypt = require('bcrypt')
const Pt = require('../models/pt');
const User = require('../models/user');

const router = express.Router();

//pts router


router.get('/', async (req, res, next) => {
    try {
        const pts = await Pt.findAll({});
        res.render('pt', {
            title: require('../package.json').name,
            port: process.env.PORT,
            pts: pts.map(pt => pt)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/create', async (req, res, next) => {
    const { name, phone } = req.body;

    try{
        const user = await User.findOne({
            where: { phone },
            attributes: [ 'userId' ]
        });
    
        const pt = await Pt.findOne({
            where: { userId: user.userId }
        });
    
        if (pt) {
            next('이미 등록하셨습니다~');
            return;
        }

        await Pt.create({
            userId: user.userId
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.get('/delete/:ptId', async (req, res, next) => {
    try {
        const result = await Pt.destroy({
            where: { ptId: req.params.ptId }
        });

        if (result) res.redirect('/');
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.get('/allPtUser', async (req, res, next) => {
    try {
        const pt = await Pt.findAll({ });

        if (pt) res.json(pt);
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
