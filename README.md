# basic-javascript-template
Basic javascript template system

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
