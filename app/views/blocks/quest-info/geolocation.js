'use strict';
/* eslint no-warning-comments: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-var: 0 */
/* eslint radix: 0 */

window.addEventListener('load', function () {
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
        excelent.style.visibiliy = 'hidden';
        imageWrapper.appendChild(excelent);
        if (imageWrapper.dataset.completed === 'true') {
            document.getElementById(excelent.id).style.visibility = 'visible';
        }
    });

    function sendGeolocation() {
        var resolveGeo = document.getElementById('resolve-geo');
        var self = this;
        var xhr = new XMLHttpRequest();
        var questId = document.getElementsByClassName('name')[0].dataset.questId;
        var imageId = document.getElementsByClassName('photo')[parseInt(self.id) - 1].dataset.imageId;
        var route = '/quests/' + questId + '/complete';
        xhr.open('POST', route);
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
            resolveGeo.style.visibility = 'hidden';
            var coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            xhr.send(JSON.stringify({
                order: parseInt(self.id),
                coords,
                imageId
            }));
        }, function () {
            resolveGeo.style.visibility = 'visible';
        }, {
            enableHighAccuracy: true,
            maximumAge: 50000,
            timeout: 10000
        });
    }
});
