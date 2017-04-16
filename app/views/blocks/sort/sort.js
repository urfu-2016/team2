'use strict';

var iconTriangle = document.getElementsByClassName('icon-triangle')[0];
var sortList = document.getElementsByClassName('sort-list')[0];
var sortChoice = document.getElementsByClassName('sort-choice')[0];

var options = document.getElementsByClassName('option');

var k = 0;
if (iconTriangle) {

    iconTriangle.onclick = function () {
    k++;
    if (k % 2 === 0) {
        sortList.style.cssText = "display: block";
    } else {
        sortList.style.cssText = "display: none";
    }
}
}


for (var i = 0; i < options.length; i++) {
    options[i].onclick = function () {
        sortChoice.innerHTML = this.innerHTML;
        sortList.style.cssText = "display: none";
        k++;
    }
}

