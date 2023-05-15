const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');

const router = express.Router();

//users router 

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll({});

        res.render('user', {
            title: require('../package.json').name,
            port: process.env.PORT,
            users: users.map(user => user)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    const { name, phone, date } = req.body;

    const user = await User.findOne({
        where: { phone }
    })

    if (user) {
        next('이미 등록하셨습니다~');
        return;
    }

    try {
        await User.create({
            name,
            phone,
            date
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.route('/update/:userId')
    .get(async (req, res, next) => {

        res.render('userUpdate', {
            title: require('../package.json').name,
            userId: req.params.userId
        });

    })
    .post(async (req, res, next) => {
        const { name, phone, date } = req.body;

        try {
            const result = await User.update({
                name,
                phone,
                date
            }, {
                where: { userId: req.params.userId }
            })

            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    })


router.get('/delete/:userId', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { userId: req.params.userId }
        });

        if (result) res.redirect('/');
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.get('/info/:userId', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { userId: req.params.userId }
        });

        if (user) res.json(user);
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;