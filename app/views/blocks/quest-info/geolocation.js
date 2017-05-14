'use strict';
/* eslint no-warning-comments: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-var: 0 */
/* eslint radix: 0 */

[].slice.call(document.getElementsByClassName('photo-wrapper')).forEach(function (imageWrapper, id) {
    var geolocation = document.createElement('img');
    geolocation.id = (id + 1) + '-geolocation';
    geolocation.alt = 'geolocation';
    geolocation.title = (id + 1) + ' achieved';
    geolocation.className = 'geo';
    geolocation.src = '//awesomequests.surge.sh/map-marker.png';
    geolocation.addEventListener('click', sendGeolocation);
    imageWrapper.appendChild(geolocation);
    var excelent = document.createElement('img');
    excelent.id = 'excelent-' + (id + 1);
    excelent.alt = 'Completed';
    excelent.title = 'Competed';
    excelent.className = 'excelent';
    excelent.src = '//awesomequests.surge.sh/green-tick.png';
    excelent.style.visibiliy = 'hidden';// TODO: задать visibility visible для пройденных квестов
    imageWrapper.appendChild(excelent);
});

function sendGeolocation() {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/complete');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementById('excelent-' + parseInt(self.id)).style.visibility = 'visible';
            } else {
                self.className = 'geo-error';
                setTimeout(function () {
                    self.className = 'geo';
                }, 500);
            }
        }
    };
    navigator.geolocation.getCurrentPosition(function (position) {
        xhr.send(JSON.stringify({
            order: parseInt(self.id),
            coords: position.coords
        }));
    }, console.error, {
        enableHighAccuracy: true,
        maximumAge: 50000,
        timeout: 10000
    });
}
