const path = require('path');
const express = require('express');
const report = require('../models/reportModel')

exports.getReportsPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "public", "views", "reports.html"))
}
exports.downloadLinkGet = async (req, res) => {
    let date = req.body.date;
    
    try {
        const userId = req.user.id;
        const results = await report.findAll({
            attributes: ['link', 'date'],

            where: {
                userId: userId,
                date:date

            }
        })
      

        res.status(200).json({ success: true, results })
    } catch (err) {

        console.log(err);
        res.status(500).json({ success: false, error: err })

    }
}

