module.exports = {
    init: function(element) {
    },
    generateQuestion: function(onAnswer) {
        return function(element) {
            element.appendChild(createButton("Right", function() {
                onAnswer({isCorrect: true});
            }));
            element.appendChild(createButton("Wrong", function() {
                onAnswer({isCorrect: false});
            }));
        };
    }
};


function createButton(text, onClick) {
    var button = document.createElement("button");
    button.innerHTML = text;
    button.addEventListener("click", onClick, false);
    return button;
}
