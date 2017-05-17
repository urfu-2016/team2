'use strict';

let MAP;

function allowDrop(event) {
    event.preventDefault();
}

/**
 * Читаем изображения, которые открыли для редактирования
 */
function readImage(url, latitude, longitude) {
    const urlEditImage = '//awesomequests-nikitc.surge.sh/edit.png';
    const img = document.createElement('img');
    img.draggable = true;
    img.id = 'drag' + (document.getElementById('photo').childElementCount + 1);
    img.className = 'image-card';
    img.style.width = '100px';
    img.style.height = '100px';
    img.ondragstart = drag;
    img.src = url;
    img.dataset.coords = latitude + ',' + longitude;

    const wrapImage = document.createElement('div');
    wrapImage.className = 'wrap-img';
    wrapImage.id = 'div' + (document.getElementById('photo').childElementCount + 1);
    wrapImage.ondrop = drop;
    wrapImage.ondragover = allowDrop;
    wrapImage.appendChild(img);

    const imgEdit = document.createElement('img');
    imgEdit.className = 'imgEdit';
    imgEdit.src = urlEditImage;
    imgEdit.onclick = handlerClickEdit;
    wrapImage.appendChild(imgEdit);
    document.getElementById('photo').appendChild(wrapImage);
}

/**
 * Обработка клика по иконке редактирования
 */
function handlerClickEdit(event) {
    const image = event.target.previousElementSibling;
    const coordsImage = image.getAttribute('data-coords').split(',');
    openLoadEditDialog(image);
    document.getElementById('coords').value = image.getAttribute('data-coords');
    const photo = document.createElement('img');
    photo.style.width = '100%';
    photo.style.height = '100%';
    photo.src = image.src;
    document.getElementById('show-photo').appendChild(photo);
    const myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: 'Point',
            coordinates: coordsImage
        },
        properties: {
            hintContent: coordsImage
        }
    });
    MAP.geoObjects.add(myGeoObject);
}

/**
 * Открываем диалог редактирования фото
 */
function openLoadEditDialog(image) {
    initDialog();
    document.getElementById('save-photo').onclick = saveEditPhoto.bind(this, image);
}

/**
 * Открываем диалог загрузки фото
 */
function openLoadDialog() {
    document.getElementById('close-error').onclick = (() => {
        document.getElementById('warning').className = 'block-hidden';
    });
    initDialog();
    document.getElementById('save-photo').onclick = savePhoto;
}

/**
 * Инициализируем диалог выбора/редактирвоания фото
 */
function initDialog() {
    const dialog = document.getElementById('photo-dialog');
    const shadow = document.getElementById('shadow');
    dialog.className = 'dialog';
    shadow.className = 'block-hidden';
}

/**
 * Действия, когда перетаскиваемый элемент перемещен в принимающий
 */
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
    targetDiv.insertBefore(dataNote, targetDiv.firstChild);
    outputBlock.insertBefore(targetImg, outputBlock.firstChild);
}

/**
 * Действия, когда элемент начал перетаскиваться
 */
function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.setData('parent', event.target.parentNode.id);
}

/**
 * Действия, когда перетаскиваемый элемент перемещен в принимающий его элемент удаления
 */
function initMap() {
    const centerYekaterinburg = [56.835, 60.59];
    MAP = new ymaps.Map('map', {
        center: centerYekaterinburg,
        zoom: 10
    });
    MAP.events.add('click', event => {
        if (MAP.geoObjects.getLength() === 1) {
            MAP.geoObjects.removeAll();
        }
        const myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: 'Point',
                coordinates: event.get('coords')
            },
            properties: {
                hintContent: event.get('coords')
            }
        });
        MAP.geoObjects.add(myGeoObject);
        document.getElementById('coords').value = event.get('coords');
    });
}

/**
 * Закрываем диалог выбора фото
 */
function closeDialog() {
    const dialog = document.getElementById('photo-dialog');
    dialog.className = 'block-hidden';
    clearDialog();
    MAP.geoObjects.removeAll();
    document.getElementById('warning').className = 'block-hidden';
}

/**
 * Очищаем данные о фото поле сохранения
 */
function clearDialog() {
    const showPhotoBlock = document.getElementById('show-photo');
    for (let i = 0; i < showPhotoBlock.childElementCount; i++) {
        showPhotoBlock.removeChild(showPhotoBlock.firstElementChild);
    }
}

/**
 * Сохраняем фото, которое открыли на редактировани
 */
function saveEditPhoto(image) {
    image.src = document.getElementById('show-photo').firstChild.src;
    image.dataset.coords = document.getElementById('coords').value;
    closeDialog();
}

/**
 * Сохраняем фото и ее метку на карте
 */
function savePhoto() {
    if (MAP.geoObjects.getLength() === 0 || document.getElementById('show-photo').childElementCount === 0) {
        document.getElementById('warning').className = '';
        return;
    }
    const urlEditImage = '//awesomequests-nikitc.surge.sh/edit.png';
    const img = document.createElement('img');
    img.draggable = true;
    img.id = 'drag' + (document.getElementById('photo').childElementCount + 1);
    img.style.width = '100px';
    img.style.height = '100px';
    img.ondragstart = drag;
    img.src = document.getElementById('show-photo').firstChild.src;
    img.dataset.coords = document.getElementById('coords').value;

    const wrapImage = document.createElement('div');
    wrapImage.className = 'wrap-img';
    wrapImage.id = 'div' + (document.getElementById('photo').childElementCount + 1);
    wrapImage.ondrop = drop;
    wrapImage.ondragover = allowDrop;
    wrapImage.appendChild(img);
    document.getElementById('input').value = '';
    closeDialog();

    const imgEdit = document.createElement('img');
    imgEdit.className = 'imgEdit';
    imgEdit.src = urlEditImage;
    imgEdit.onclick = handlerClickEdit;
    wrapImage.appendChild(imgEdit);
    document.getElementById('photo').appendChild(wrapImage);
}

/**
 * Переномеруем порядок фотографий после перемещения dragn'drop
 */
function recountPhotos() {
    const photos = document.getElementById('photo');
    const elements = photos.getElementsByTagName('div');
    for (let i = 1; i <= elements.length; i++) {
        const currentChild = elements[i - 1];
        currentChild.firstChild.id = 'drag' + i;
        currentChild.id = 'div' + i;
    }
}

/**
 * Действия, когда перетаскиваемый элемент перемещен в принимающий его элемент удаления
 */
function dropDelete(event) {
    event.preventDefault();
    const parentData = event.dataTransfer.getData('parent');
    const outputBlock = document.getElementById(parentData);
    outputBlock.parentNode.removeChild(outputBlock);
    recountPhotos();
}

exports.savePhoto = savePhoto;
exports.openLoadDialog = openLoadDialog;
exports.readImage = readImage;
exports.initMap = initMap;
exports.closeDialog = closeDialog;
exports.drop = dropDelete;
exports.dragOver = allowDrop;
