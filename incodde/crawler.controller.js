'use strict';
const dateUtil = require('./dateUtil');
const neocambioURL = 'https://www.neocambio.io/cotacao/euro/';
const cheerio = require('cheerio');
const request = require('request-promise');

exports.findTodaysCurrency = (req, res) => {
    request.get(neocambioURL, (error, response, body) => {
        if (error) return res.status(500);
        const $ = cheerio.load(body);
        const currency = $('.card__body .currency__wrapper').find('h2').next().next().html();
        res.status(200).send(currency.slice(3, 7));
    });    
};

exports.findCurrencyByDay = (req, res) => {
    request.get(neocambioURL + req.body.day, (error, response, body) => {
        if (error) return res.status(500);
        const $ = cheerio.load(body);
        const currency = $('.card__body .currency__wrapper').find('h2').next().next().html();
        res.status(200).send(currency.slice(3, 7));
    });
};

exports.findCurrencyByPeriod = async (req, res) => {

    var nowDate = new Date(dateUtil.formatISODate(req.body.start));
    const endDate = new Date(dateUtil.formatISODate(req.body.end));
    var days = [];
    var currencies = [];
    var dayCurrencyMap = {};

    while (nowDate.getTime() <= endDate.getTime()) { 
        var formattedDate = dateUtil.formatCustomDate(nowDate);

        await request.get(neocambioURL + formattedDate, (error, response, body) => {
            if (error) return res.status(500);
            const $ = cheerio.load(body);
            const currency = $('.card__body .currency__wrapper').find('h2').next().next().html();
            currencies.push(parseFloat(currency.slice(3, 4)+"."+currency.slice(5, 7)));
            days.push(formattedDate);
        });

        nowDate.setDate(nowDate.getDate()+1);
    }

    dayCurrencyMap["day"] = days;
    dayCurrencyMap["currency"] = currencies;
    res.status(200).send(dayCurrencyMap);
};