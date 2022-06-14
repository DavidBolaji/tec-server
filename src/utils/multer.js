const multer = require('multer');

const upload = multer({
    dest: '\src/assets/images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('Please upload image file'))
        }

        cb(undefined, true);
    }
})

module.exports = upload;