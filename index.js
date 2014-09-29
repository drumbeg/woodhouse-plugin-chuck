var request = require('request');
var cheerio = require('cheerio');

var archer = function() {
    this.name = 'archer';
    this.displayname = 'Archer';
    this.description = 'Gives you a random archer quote';
}

archer.prototype.init = function(){
    var self = this;
    this.listen('archer me', 'standard', function(from, interface, params){
        self.getQuote(from, interface, params);
    })
}

archer.prototype.getQuote = function(from, interface, params){
    var self = this,
        options = {
            uri: 'http://en.wikiquote.org/wiki/Archer_(TV_series)',
            headers: {
                'user-agent': 'Woodhouse Bot - https://github.com/lukeb-uk/woodhouse'
            }
        };

    request(options, function(err, response, html){
        if (err) {throw err}

        var $ = cheerio.load(html);
        var quotes = $("dl").toArray();
        var quote = quotes[Math.floor(Math.random() * quotes.length)];
        var message = $(quote).text().trim();

        self.sendMessage(message, interface, from);
    })
}

module.exports = archer;
