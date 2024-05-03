const imageKit = require('../libs/imageKit');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            let strFile = (await imageKit.upload({
                fileName: Date.now() + '.png',
                file: req.file.buffer.toString('base64')
            })).url;

            let result = await prisma.image.create({
                data: {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi,
                    url_gambar: strFile,
                    imagekit_url: req.file.originalname
                }
            });

            res.json({
                status: true,
                message: 'Image uploaded successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },
    getAllImage: async (req, res, next) => {
        try {
            let result = await prisma.image.findMany({
                select: {
                    id: true,
                    judul: true,
                    deskripsi: true,
                    url_gambar: true,
                }
            });

            res.json({
                status: true,
                message: 'List of uploaded images',
                data: result
            });
        } catch (error) {
            next(error);
        }
    },
    getDetailImage: async (req, res, next) => {
        try {
            let result = await prisma.image.findUnique({
                where: {
                    id: parseInt(req.params.id),
                }
            });

            if (result) {
                res.json({
                    status: true,
                    message: 'Detail image',
                    data: result
                });
            } else {
                res.json({
                    status: false,
                    message: 'Image not found',
                    data: null
                });
            }
        } catch (error) {
            next(error);
        }
    },

    deleteImage: async (req, res, next) => {
        let id = parseInt(req.params.id);
        try {

            let find = await prisma.image.findUnique({
                where: {
                    id
                }
            })

            console.log (find)

            if (find) {
                let fileId = find.imagekit_url;
                await imageKit.deleteFile(
                    fileId
                );
                
            }
            // let result = await prisma.image.delete({
            //     where: {
            //         id
            //     }
            // });

            res.json({
                status: true,
                message: 'Image deleted successfully',
                // data: result
            });
        } catch (error) {
            if (error.response && error.response.data.message === 'Your request contains invalid fileId parameter.') {
                res.status(400).json({
                    status: false,
                    message: 'Image not found',
                    data: null
                });
            } else {
                next(error);
            }
        }
    },



    editImage: async (req, res, next) => {
        try {
            let result = await prisma.image.update({
                where: {
                    id: parseInt(req.params.id),
                },
                data: {
                    judul: req.body.judul ? req.body.judul : undefined,
                    deskripsi: req.body.deskripsi ? req.body.deskripsi : undefined,
                }
            });

            res.json({
                status: true,
                message: 'Image edited successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }




}


