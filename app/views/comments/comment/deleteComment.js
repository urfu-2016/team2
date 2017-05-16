'use strict';
/* eslint prefer-arrow-callback: 0 */
/* eslint no-var: 0 */
/* eslint radix: 0 */

window.addEventListener('load', function () {
    [].slice.call(document.getElementsByClassName('quest-comment__delete')).forEach(function (deleteComment) {
        var commentId = parseInt(deleteComment.id);
        var questId = deleteComment.dataset.questId;
        deleteComment.addEventListener('click', function () {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/quests/' + questId + '/comments/' + commentId + '/delete');
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var comment = document.getElementById('comment-' + commentId);
                    comment.style.display = 'none';
                }
            };
            xhr.send();
        });
    });
});
