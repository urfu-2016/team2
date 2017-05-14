/**
 * Загружаем изображение
 */
function loadImage(event) {
    clearDialog();
    const fileInput = event.target;
    const image = fileInput.files[0];
    /*eslint-disable */
    const reader = new FileReader();
    /*eslint-enable */

    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        const photo = document.createElement('img');
        photo.style.width = '100%';
        photo.style.height = '100%';
        photo.src = reader.result;
        document.getElementById('show-photo').appendChild(photo);
    });
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

exports.loadImage = loadImage;
