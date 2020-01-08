var fs = require('fs');

fs.createReadStream('image/image.png').pipe(fs.createWriteStream('image/img-stream.jpg').on('finish', function () {
    console.log('Arquivo escrito stream')
}));