let labels = document.querySelectorAll('label span');
let inputs = document.querySelectorAll('input');

inputs.forEach(input => input.addEventListener('focus', focus_input));
inputs.forEach(input => input.addEventListener('blur', blur_input));

function focus_input(e) {
    e.currentTarget.previousElementSibling.classList.add('focused');
}

function blur_input(e) {
    e.currentTarget.value.length === 0 ? e.currentTarget.previousElementSibling.classList.remove('focused') : e.currentTarget.previousElementSibling.classList.add('focused');
}