(function() {
    this.amirTemplateEngine = function() {
        var self = this;

        // evaluate in-line expressions
        self.evaluateString = function(string, options) {
            var _tokensToReplace = string.match(new RegExp(/({{=[^}]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, (function() {
                    return eval(token.replace("{{=", "").replace("}}", ""));
                }).call(options && options.context ? options.context : self));
            });

            return string;
        };

        // replace given object
        self.replaceGivenObject = function(string, options) {
            var values = options && options.values ? options.values : {};
            var _tokensToReplace = string.match(new RegExp(/({{[ ]*[^}.]+[ ]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, values[token.replace(" ", "").replace("{{", "").replace("}}", "")]);
            });

            return string;
        };

        // replace given array index
        self.replaceGivenArray = function(string, options) {
            var array = options && options.array ? options.array : {};
            var _tokensToReplace = string.match(new RegExp(/({{[ ]*[0-9]+[ ]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, options.array[parseInt(token.replace(" ", "").replace("{{", "").replace("}}", ""))]);
            });

            return string;
        };

        // helper function
        self.format = function(string, options) {
            // evaluate expressions
            string = self.evaluateString(string, options);

            // if options.array is defined, then evaluate template
            string = self.replaceGivenArray(string, options);

            // if options.values is defined, then evaluate template
            string = self.replaceGivenObject(string, options);

            return string;
        };

        // for chainability
        return self;
    };
})();


(function() {
    var self = this;
    something = "something else!";
    var template = "\
                    <h2 class='{{= (true).toString()}}'>{{0}} {{1}} {{2}}</h2>\
                    <p>{{= 4 > 0 ? 'good' : 'bad'}}</p>\
                    <p>{{= something }}</p>\
                    <p>{{name}}</p>\
                ";

    var x = new amirTemplateEngine();

    console.log(x.format(template, {
        array: ["seyed", "amir", "hossein"],
        values: {
            name: "amir"
        },
        context: self
    }));
})();
