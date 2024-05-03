const multer = require('multer');
const path = require('path');

const filename = (req, file, callback) => {
    let fileName = Date.now()+ path.extname(file.originalname);
    callback(null, fileName);
};

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, destination);
        },
        filename : filename
    });

};

module.exports = {
    imageStorage : multer ({storage: generateStorage('./public/image'),
    fileFilter: (req, file, callback) => {
        let allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            let err = new Error(`Only ${allowedMimes} are allowed`);
            callback(err, false);
        }
    },
    onError: (err, next) => {
        next(err);
    }
}),
    image: multer({
        fileFilter: (req, file, callback) => {
            let allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedMimes.includes(file.mimetype)) {
                callback(null, true);
            } else {
                let err = new Error(`Only ${allowedMimes} are allowed`);
                callback(err, false);
            }
        },
        onError: (err, next) => {
            next(err);
        }
    })
}