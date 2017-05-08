'use strict';

function likeQuest(questId) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/quests/' + questId + '/like');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var likesCount = document.getElementById('likes-count');
            likesCount.innerText = parseInt(likesCount.innerText) + 1;
        }
    };
}
