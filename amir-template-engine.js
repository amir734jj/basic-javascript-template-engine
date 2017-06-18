(function() {
    this.amirTemplateEngine = function() {
        var self = this;
        var _tokensToReplace, _values, _array;

        // evaluate in-line expressions
        self.evaluateString = function(string, options) {
            _tokensToReplace = string.match(new RegExp(/({{=[^}]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, (function() {
                    return eval(token.replace("{{=", "").replace("}}", ""));
                }).call(options && options.context ? options.context : self));
            });

            return string;
        };

        // replace given object
        self.replaceGivenObject = function(string, options) {
            _values = options && options.values ? options.values : {};
            _tokensToReplace = string.match(new RegExp(/({{[ ]*[^}.]+[ ]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, _values[token.replace(" ", "").replace("{{", "").replace("}}", "")]);
            });

            return string;
        };

        // replace given array index
        self.replaceGivenArray = function(string, options) {
            _array = options && options.array ? options.array : {};
            _tokensToReplace = string.match(new RegExp(/({{[ ]*[0-9]+[ ]*}})/g)) || [];

            _tokensToReplace.map(function(token) {
                string = string.replace(token, _array[parseInt(token.replace(" ", "").replace("{{", "").replace("}}", ""))]);
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
