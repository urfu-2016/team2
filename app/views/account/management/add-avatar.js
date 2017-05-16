'use strict';

function handleFileSelect(event) {
    const fileInput = event.target;
    const image = fileInput.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        const avatar = document.createElement('img');
        avatar.width = '150';
        avatar.height = '150';
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
    avatarImage.width = '150';
    avatarImage.height = '150';
    avatarImage.src = url;
    document.getElementById('avatar').appendChild(avatarImage);
}

exports.initAvatar = initAvatar;
exports.handleFileSelect = handleFileSelect;
