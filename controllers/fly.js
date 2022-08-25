const { response, request } = require('express');
const Flys = require('../models/fly');

const flyGet = async(req = request, res = response) => {
    const { limit = 5, since = 0 } = req.query;

    const [total, flys] = await Promise.all([
        Flys.countDocuments({status: true}),
        Flys.find({ status: true})
        .skip(Number(since))    
        .limit(Number(limit))
    ])
    res.json({
        total,
        flys
    });
}

const flyPost = async(req, res = response) => {
    const { from, to, duration, passengers } = req.body;
    const fly = new Flys({ from, to, duration, passengers});
    await fly.save();
    res.json({fly});
}

module.exports = {
    flyGet,
    flyPost
}