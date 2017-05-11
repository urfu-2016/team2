'use strict';

const iconTriangle = document.getElementsByClassName('icon-triangle')[0];
const sortList = document.getElementsByClassName('sort-list')[0];
const sortChoice = document.getElementsByClassName('sort-choice')[0];

const options = document.getElementsByClassName('option');

let k = 1;
iconTriangle.onclick = function () {
    k++;
    if (k % 2 === 0) {
        sortList.style.cssText = 'display: block';
    } else {
        sortList.style.cssText = 'display: none';
    }
};

for (let i = 0; i < options.length; i++) {
        click(options[i], sortChoice, sortList);
        k++;
}

function click(option, sortChoice, sortList) {
    option.onclick = function () {
        sortChoice.innerHTML = this.innerHTML;
        sortList.style.cssText = 'display: none';
    };
}
