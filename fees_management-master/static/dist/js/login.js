'use strict';

var labels = document.querySelectorAll('label span');
var inputs = document.querySelectorAll('input');

inputs.forEach(function (input) {
    return input.addEventListener('focus', focus_input);
});
inputs.forEach(function (input) {
    return input.addEventListener('blur', blur_input);
});

function focus_input(e) {
    e.currentTarget.previousElementSibling.classList.add('focused');
}

function blur_input(e) {
    e.currentTarget.value.length === 0 ? e.currentTarget.previousElementSibling.classList.remove('focused') : e.currentTarget.previousElementSibling.classList.add('focused');
}