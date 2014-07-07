var fs = require("fs");

module.exports = {
    id: 1,
    uid: "0b90dfe7-64b1-454c-86a9-3fe06bcfa03f",
    title: "Converting numbers in other bases to decimal",
    lessonHtml: fs.readFileSync(__dirname + "/to-decimal.html"),
    browserModule: __dirname + "/to-decimal.browser.js"
};
