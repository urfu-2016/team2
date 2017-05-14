'use strict';

function handleFileSelect(event) {
    const fileInput = event.target;
    const image = fileInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        const avatar = document.createElement('img');
        avatar.style.width = '150px';
        avatar.style.height = '150px';
        avatar.src = reader.result;
        document.getElementById('avatar').innerHTML = '';
        document.getElementById('avatar').appendChild(avatar);
        document.getElementById('dataImage').value = reader.result;
    });
}

function initAvatar(url) {
    if (!url) {
        return;
    }
    document.getElementById('avatar').innerHTML = '';
    const avatarImage = document.createElement('img');
    document.getElementById('dataImage').value = url;
    avatarImage.style.width = '150px';
    avatarImage.style.height = '150px';
    avatarImage.src = url;
    document.getElementById('avatar').appendChild(avatarImage);
}

exports.initAvatar = initAvatar;
exports.handleFileSelect = handleFileSelect;
