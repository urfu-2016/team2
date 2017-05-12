'use strict';

let MAP;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.setData('parent', event.target.parentNode.id);
}

function dropDelete(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const parentData = event.dataTransfer.getData('parent');
    const outputBlock = document.getElementById(parentData);
    const dataNote = document.getElementById(data);
    outputBlock.parentNode.removeChild(outputBlock);
    outputBlock.removeChild(dataNote);
    recountPhotos();
}

function recountPhotos() {
    const photos = document.getElementById('photo');
    const elements = photos.getElementsByTagName('div');
    for (let i = 1; i <= elements.length; i++) {
        const currentChild = elements[i - 1];
        currentChild.firstChild.id = 'drag' + i;
        currentChild.id = 'div' + i;
    }
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const parentData = event.dataTransfer.getData('parent');
    const outputBlock = document.getElementById(parentData);
    const targetImg = event.target;
    if (targetImg.tagName !== 'IMG') {
        return;
    }
    const targetDiv = targetImg.parentNode;
    const dataNote = document.getElementById(data);
    outputBlock.removeChild(dataNote);
    targetDiv.appendChild(dataNote);
    outputBlock.appendChild(targetImg);
}

function loadImage(event) {
    const fileInput = event.target;
    const image = fileInput.files[0];
    /*eslint-disable */
    const reader = new FileReader();
    /*eslint-enable */

    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        const photo = document.createElement('img');
        photo.width = 100;
        photo.height = 100;
        photo.src = reader.result;
        document.getElementById('show-photo').appendChild(photo);
    });
}

function openLoadDialog() {
    const dialog = document.getElementById('photo-dialog');
    const shadow = document.getElementById('shadow');
    dialog.className = 'dialog';
    shadow.className = 'block-hidden';
}

function closeDialog() {
    const dialog = document.getElementById('photo-dialog');
    dialog.className = 'block-hidden';
    clearDialog();
}

function clearDialog() {
    const showPhotoBlock = document.getElementById('show-photo');
    for (let i = 0; i < showPhotoBlock.childElementCount; i++) {
        showPhotoBlock.removeChild(showPhotoBlock.firstElementChild);
    }
    MAP.geoObjects.removeAll();
}

function savePhoto() {
    if (MAP.geoObjects.getLength() === 0 || document.getElementById('show-photo').childElementCount === 0) {
        document.getElementById('warning').className = '';
        return;
    }
    const img = document.createElement('img');
    img.draggable = true;
    img.id = 'drag' + (document.getElementById('photo').childElementCount + 1);
    img.width = 100;
    img.height = 100;
    img.ondragstart = drag;
    img.src = document.getElementById('show-photo').firstChild.src;
    img.coords = document.getElementById('coords').value;

    const wrapImage = document.createElement('div');
    wrapImage.className = 'wrap-img';
    wrapImage.id = 'div' + (document.getElementById('photo').childElementCount + 1);
    wrapImage.ondrop = drop;
    wrapImage.ondragover = allowDrop;
    wrapImage.appendChild(img);
    document.getElementById('photo').appendChild(wrapImage);
    document.getElementById('input').value = '';
    document.getElementById('warning').className = 'block-hidden';
    closeDialog();
}

function initMap() {
    const centerYekaterinburg = [56.835, 60.59];
    /*eslint-disable */
    MAP = new ymaps.Map('map', {
        center: centerYekaterinburg,
        zoom: 10
    });
    /*eslint-enable */
    MAP.events.add('click', event => {
        if (MAP.geoObjects.getLength() === 1) {
            MAP.geoObjects.removeAll();
        }
        /*eslint-disable */
        const myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: 'Point',
                coordinates: event.get('coords')
            },
            properties: {
                hintContent: event.get('coords')
            }
        });
        /*eslint-enable */
        MAP.geoObjects.add(myGeoObject);
        document.getElementById('coords').value = event.get('coords');
    });
}

exports.initMap = initMap;
exports.savePhoto = savePhoto;
exports.closeDialog = closeDialog;
exports.openLoadDialog = openLoadDialog;
exports.loadImage = loadImage;
exports.drop = dropDelete;
exports.dragOver = allowDrop;
