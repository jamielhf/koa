const fs = require('fs');
const path = require('path')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

let f = path.join(__dirname,'/static/image/album/e30848caa67a2.png')
function a() {
    return  imagemin([f], './static/out', {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    })

}


a().then(function (f) {
    console.log(f)
})
