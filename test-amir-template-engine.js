var template = require('./amir-template-engine');

(function() {
    var self = this;
    something = "something else!";
    var template = "\
                    <h2 class='{{= (true).toString()}}'>{{0}} {{1}} {{2}}</h2>\
                    <p>{{= 4 > 0 ? 'good' : 'bad'}}</p>\
                    <p>{{= something }}</p>\
                    <p>{{name}}</p>\
                ";

    var result = "\
                    <h2 class='true'>seyed amir hossein</h2>\
                    <p>good</p>\
                    <p>something else!</p>\
                    <p>amir</p>\
                ";

    var templateObj = new amirTemplateEngine();

    testResult = templateObj.format(template, {
        array: ["seyed", "amir", "hossein"],
        values: {
            name: "amir"
        },
        context: self
    }) == result;

    console.log("Test is" + (testResult ? "" : " NOT") + " passing!");
})();
