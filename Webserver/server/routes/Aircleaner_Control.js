const express = require('express');
const http = require('http');
const router = express.Router();

let aircleaner = require('../model/aircleaner');

let aircleanerUrl = {
    hostname: '192.168.0.12',
    port: '3000',
    path : '?'
};

const aa = {};

router.get('/power', (req, res, next) => {
    console.log('Aircleaner Power');
    aircleanerUrl.path += aircleaner.control.ctrlpower;
    console.log(aircleaner.control.ctrlpower);
    http.request(aircleanerUrl).end();
    aircleanerUrl.path = '?';
    res.json(JSON.stringify(aa));
});

router.get('/speedup', (req, res, next) => {
    console.log('Aircleaner speedup');
    aircleanerUrl.path += aircleaner.control.ctrlspeedup;
    console.log(aircleaner.control.ctrlspeedup);
    http.request(aircleanerUrl).end();
    aircleanerUrl.path = '?';
    res.json(JSON.stringify(aa));
});

router.get('/speeddown', (req, res, next) => {
    console.log('Aircleaner speeddown');
    aircleanerUrl.path += aircleaner.control.ctrlspeeddown;
    console.log(aircleaner.control.ctrlspeeddown);
    http.request(aircleanerUrl).end();
    aircleanerUrl.path = '?';
    res.json(JSON.stringify(aa));
});

module.exports = router;