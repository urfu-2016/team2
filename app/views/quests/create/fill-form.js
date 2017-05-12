'use strict';

function fillForm() {
    const photos = document.getElementById('photo');
    const collectBlock = document.getElementById('collect-block');
    const elements = photos.getElementsByTagName('div');
    for (var i = 1; i <= elements.length; i++) {
        let currentChild = elements[i - 1];
        const image = currentChild.firstChild;
        const newInput = document.createElement('input');
        const inputCoords = document.createElement('input');
        inputCoords.name = 'inputCoords' + i;
        inputCoords.type = 'text';
        inputCoords.className = 'input-hidden';
        inputCoords.value = image.coords;
        collectBlock.appendChild(inputCoords);

        newInput.name = 'inputImage' + i;
        newInput.type = 'text';
        newInput.className = 'input-hidden';
        newInput.value = image.src;
        collectBlock.appendChild(newInput);
    }
}

exports.fillForm = fillForm;
