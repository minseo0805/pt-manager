const express = require('express');
const bcrypt = require('bcrypt')
const Pt = require('../models/pt');
const User = require('../models/user');
const PtDate = require('../models/ptDate');

const router = express.Router();

//ptDates router 
 
router.get('/', async(req, res, next) =>{
    try{
        const pts = await Pt.findAll({})
        res.render('ptDate-info', {
            title: require('../package.json').name,
            port: process.env.PORT,
            pts: pts.map(pt => pt.ptId)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})
 
router.route('/create/:ptId')
    .get(async (req, res, next) => {
        try {
            const ptDate = await PtDate.findOne({
                where: { ptId: req.params.ptId }
            });

            res.render('ptDate', {
                title: require('../package.json').name,
                ptId: req.params.ptId
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try{
            await PtDate.create({
                ptId: req.params.ptId,
                ptDate: req.body.ptDate
            });
            res.redirect('/');
        } catch(err){
            console.error(err);
            next(err);
        }
    })

router.get('/info/:ptId', async (req, res, next) => {
    try {
        const ptDate = await PtDate.findOne({
            where: { ptId: req.params.ptId }
        });

        if (ptDate) res.json(ptDate);
        else next(`There is no user with ${req.params.id}.`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;