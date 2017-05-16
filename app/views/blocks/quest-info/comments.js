'use strict';
/* eslint no-extend-native: 0 */
/* eslint no-var: 0 */
/* eslint padded-blocks: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-extend-native: 0 */
/* eslint default-case: 0 */

Array.prototype.each = Array.prototype.each || function (func) {
    for (var idx = 0; idx < this.length; idx++) {
        if (!func(this[idx], idx, this)) {

            return false;
        }
    }

    return true;
};

window.addEventListener('load', function () {
    var addComment = document.getElementById('add-comment');
    var commentForm = document.getElementById('comment-form');
    var createComment = document.getElementById('create-comment');
    var questComments = document.getElementById('quest-comments');
    var questId = commentForm.dataset.questId;
    var notFound = document.getElementById('not-found');
    var formInputs = [].slice.call(document.getElementsByClassName('comment-form__input'));
    var click = document.createEvent('Events');
    click.initEvent('click', true, false);

    addComment.addEventListener('click', function () {
        commentForm.style.display = 'block';
    });

    createComment.addEventListener('click', function () {
        if (formInputs.each(function (input) {
            return input.value.length > 0;
        })) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/quests/' + questId + '/comment');

            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    commentForm.style.display = 'none';
                    formInputs.forEach(function (input) {
                        input.value = '';
                    });
                    if (notFound) {
                        notFound.style.display = 'none';
                    }
                    var commentParams = JSON.parse(this.responseText);
                    var comment = createCommentByParams(commentParams);
                    questComments.appendChild(comment);
                }
            };

            var formData = new FormData(commentForm);
            xhr.send(formData);
        }
    });

    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 27:
                commentForm.style.display = 'none';
                break;
            case 13:
                createComment.dispatchEvent(click);
                break;
        }
    });
});

function createCommentByParams(commentParams) {
    var comment = document.createElement('div');
    comment.className = 'quest-comment';

    var commentUser = document.createElement('p');
    commentUser.className = 'quest-comment__user';
    commentUser.innerHTML = '<strong>&laquo;' + commentParams.title +
        '&raquo;</strong> - ' + commentParams.author + ', ' + commentParams.date;

    var commentText = document.createElement('p');
    commentText.className = 'quest-comment__text';
    commentText.innerText = commentParams.text;

    comment.appendChild(commentUser);
    comment.appendChild(commentText);

    return comment;
}
