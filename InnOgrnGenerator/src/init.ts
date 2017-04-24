var innul;
var innfl;
var ogrnul;
var ogrnfl;
var okpo;
var snils;
var innulButton;
var innflButton;
var ogrnulButton;
var ogrnflButton;
var okpoButton;
var snilsButton;

document.addEventListener("DOMContentLoaded", () => {
    innul = document.getElementById('innul');
    innfl = document.getElementById('innfl');
    ogrnul = document.getElementById('ogrnul');
    ogrnfl = document.getElementById('ogrnfl');
    okpo = document.getElementById('okpo');
    snils = document.getElementById('snils');
    innulButton = document.getElementById('innulbutton');
    innflButton = document.getElementById('innflbutton');
    ogrnulButton = document.getElementById('ogrnulbutton');
    ogrnflButton = document.getElementById('ogrnflbutton');
    okpoButton = document.getElementById('okpobutton');
    snilsButton = document.getElementById('snilsbutton');

    var input = document.getElementsByTagName('input');
    for (var i = 0; i < input.length; i++)
        if (input[i].type == 'text' && input[i].oninput)
            input[i].oninput();
});