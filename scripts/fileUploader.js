/* eslint camelcase: 0 */
/* eslint func-names: 0 */
/* eslint arrow-parens: 0 */

const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: 'photoquestteam2',
    api_key: '215647399772368',
    api_secret: 'CfgihH2SKsloS-phluVt_bQ07Ek'
});

module.exports = function upload(file, callback) {
    cloudinary.uploader.upload(file, (result) => {
        if ('error' in result) {
            callback(result.error);
        } else {
            callback(null, result.url);
        }
    });
};
