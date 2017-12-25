const fs = require('fs');
const path = require('path')

let f = path.join(__dirname,'/static/image/album/0ac323b6955e4.jpeg')

let a = fs.readFileSync(f);

console.log(a.length)