exports.getDate = function () {

     return new Date().toISOString().
     replace(/T/, ' ').  
     replace(/\..+/, '');
}

exports.getDefaultDateTime = function () {
    return Date();
}