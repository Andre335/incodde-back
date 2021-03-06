const express = require('express');
const Crawler = require('./crawler.controller.js');
const router = express.Router();
const cors = require('cors');

router.get('/', Crawler.findTodaysCurrency);

router.post('/DayCurrency', cors(), Crawler.findCurrencyByDay);

router.post('/PeriodCurrency', cors(), Crawler.findCurrencyByPeriod);

module.exports = router;
