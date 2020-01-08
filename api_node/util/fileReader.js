var fs = require('fs');

fs.readFile('image/image.png', function (error, buffer) {
    console.log('arquivo lido');

    fs.writeFile('image.png', buffer, function (err) {
        console.log('Arquivo escrito');
    });
})