const fs = require('fs');
const path = require('path')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

let f = path.join(__dirname,'/static/image/album/0a299596a8ea.jpeg')
let f2 = path.join(__dirname,'/static/image/album/0b71f3ef43761.jpeg')
let f3 = path.join(__dirname,'/static/image/album/1fa676efca193.jpeg')
async function aaa() {
    return await  imagemin([f,f2,f3], './static/out', {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    })
}

async function get() {
    let f =await aaa()
    console.log(f);
}

get()
