'use strict';

exports.formatISODate = function(date) {
    var day = date.slice(0, 2);
    var month = date.slice(3, 5);
    var year = date.slice(6, 10);
    var formatted = year + "-" + month + "-" + day;
    return formatted;
};

exports.formatCustomDate = function(date) {
    var day = date.getDate()+1;
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var formattedDate = day + "-" + month + "-" + year;
    return formattedDate;
};