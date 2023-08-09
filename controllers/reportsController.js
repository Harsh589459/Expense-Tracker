const path = require('path');
const express = require('express');

exports.getReportsPage=(req,res,next)=>{
    res.sendFile(path.join(__dirname,"../","public","views","reports.html"))
}