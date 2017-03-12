/* eslint camelcase: 0 */
/* eslint func-names: 0 */
/* eslint arrow-parens: 0 */

var cloudinary = require('cloudinary');
var fs = require('fs');

cloudinary.config({
    cloud_name: 'photoquestteam2',
    api_key: '215647399772368',
    api_secret: 'CfgihH2SKsloS-phluVt_bQ07Ek'
});

module.exports = function upload(file, callback) {
    fs.writeFile('temp', file, (err) => {
        if (err) {
            callback(null, err);
            return;
        }

        cloudinary.uploader.upload('temp', (result, err) => {
            if (err) {
                callback(null, err);
            } else if ('error' in result) {
                callback(null, result.error);
            } else {
                callback(result.url);
            }
        });
    });
};
