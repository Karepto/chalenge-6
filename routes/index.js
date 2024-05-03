var express = require('express');
var router = express.Router();
const { image } = require('../libs/multer');
const { uploadImage, getAllImage, getDetailImage, deleteImage, editImage } = require('../controllers/mediaController');



router.post('/image', image.single('file'), uploadImage);

router.get('/showImage', getAllImage);

router.get('/detailImage/:id', getDetailImage);

router.delete('/deleteImage/:id', deleteImage);

router.put('/editImage/:id', editImage);

module.exports = router;
