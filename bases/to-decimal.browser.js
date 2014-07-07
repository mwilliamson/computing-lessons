var fs = require("fs");

var _ = require("underscore");
var knockoutWidgets = require("web-widgets-knockout");
var knockout = require("knockout");

var random = require("../lib/random");
var questionWithExplanation = require("../widgets/question-with-explanation");

module.exports = {
    init: function(element) {
    },
    generateQuestion: function(onAnswer) {
        var base = random.integer(2, 5);
        var numberOfDigits = random.integer(2, 8 - base);
        var digits = range(0, numberOfDigits).map(function() {
            return random.integer(0, base - 1);
        });
        var number = digits.join("");
        var answer = sum(digits.map(function(digit, index) {
            return digit * Math.pow(base, digits.length - index - 1);
        }));
        
        var explanationWidget = function() {
        };
        
        return withOptions(questionWithExplanation, {
            onAnswer: onAnswer,
            questionWidget: withOptions(questionWidget, {
                base: base, number: number, answer: answer
            }),
            explanationWidget: explanationWidget
        });
    }
};

var questionWidget = knockoutWidgets.create({
    template: fs.readFileSync(__dirname + "/to-decimal-question.html", "utf8"),
    init: function(options) {
        var base = options.base;
        var number = options.number;
        var answer = options.answer;
        var onAnswer = options.onAnswer;
            
        var submittedAnswer = knockout.observable();
        function submitAnswer() {
            if (answer === parseInt(submittedAnswer(), 10)) {
                onAnswer({
                    isCorrect: true,
                    resultText: "Correct!"
                });
            } else {
                onAnswer({
                    isCorrect: false,
                    resultText: "The correct answer is: " + answer
                });
            }
            
        }
        return {
            base: base,
            number: number,
            submittedAnswer: submittedAnswer,
            submitAnswer: submitAnswer
        };
    }
});


function withOptions(widget, boundOptions) {
    return function(element, options) {
        var finalOptions = _.clone(boundOptions);
        _.extend(finalOptions, options);
        widget(element, finalOptions);
    };
}


function range(min, max) {
    var result = [];
    for (var i = min; i < max; i++) {
        result[i - min] = i;
    }
    return result;
}

function sum(array) {
    var total = 0;
    array.forEach(function(element) {
        total += element;
    });
    return total;
}
