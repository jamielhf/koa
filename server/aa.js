const fs = require('fs');
const path = require('path')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

let f = path.join(__dirname,'/static/image/album/18d3999bc1ca1.png')

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

