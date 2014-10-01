var request = require('request');

var chuck = function() {
    this.name = 'chuck';
    this.displayname = 'Chuck';
    this.description = 'Gives you a random chuck quote';
}

chuck.prototype.init = function(){
    var self = this;
    this.listen('roundhouse', 'standard', function(from, interface, params){
        self.getQuote(from, interface, params);
    })
}

chuck.prototype.getQuote = function(from, interface, params){
    var self = this,
        options = {
            uri: 'http://api.icndb.com/jokes/random',
            headers: {
                'user-agent': 'Woodhouse Bot - https://github.com/lukeb-uk/woodhouse'
            }
        };

    request(options, function(err, response, data){
        if (err) {throw err}
        var object = JSON.parse(data);

        self.sendMessage(object.value.joke, interface, from);
    })
}

module.exports = chuck;
