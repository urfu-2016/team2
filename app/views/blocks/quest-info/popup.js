'use strict';
/* eslint no-warning-comments: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-var: 0 */
/* eslint radix: 0 */
/* eslint no-undef: 0 */

window.addEventListener('load', function () {
    var photos = document.getElementsByClassName('photo');
    var popUp = document.getElementById('pop-up');
    var wrapper = document.getElementById('pop-up-wrapper');

    for (var i = 0; i < photos.length; i++) {
        photos[i].onclick = function () {
            var source = this.getAttribute('src');
            popUp.setAttribute('src', source);
            wrapper.style.visibility = 'visible';
        };
    }

    popUp.onclick = function () {
        wrapper.style.visibility = 'hidden';
    };
});
