'use strict';

const iconTriangle = document.getElementsByClassName('icon-triangle')[0];
const sortList = document.getElementsByClassName('sort-list')[0];
const sortChoice = document.getElementsByClassName('sort-choice')[0];

const options = document.getElementsByClassName('option');

let k = 0;
iconTriangle.addEventListener('click', () => {
    openClose();
});

for (let i = 0; i < options.length; i++) {
        click(options[i], sortChoice);
}

function click(option, sortChoice) {
    option.addEventListener('click', function () {
        sortChoice.innerHTML = this.innerHTML;
        openClose();
    });
}

function openClose() {
    if (k % 2 === 0) {
        sortList.style.cssText = 'display: block';
    } else {
        sortList.style.cssText = 'display: none';
    }
    k++;
}
