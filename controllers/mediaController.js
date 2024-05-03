const imageKit = require('../libs/imageKit');
const { PrismaClient } = require('@prisma/client');
const path = require("path")

const prisma = new PrismaClient();


module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            if (!req.body.judul || !req.body.deskripsi || !req.file) {
                return res.json({
                    status: false,
                    message: 'Judul, deskripsi, dan file harus diisi'
                });
            }

            let upload = await imageKit.upload({
                fileName: Date.now() + '.png',
                file: req.file.buffer.toString('base64')
            });

            let result = await prisma.image.create({
                data: {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi,
                    url_gambar: upload.url,
                    imagekit_url: upload.fileId
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

                await prisma.image.delete({
                    where: {
                        id
                    }
                })
            }

            res.json({
                status: true,
                message: 'Image deleted successfully',
                // data: result
            });
        } catch (error) {
                next(error);
  
        }
    },

    editImage: async (req, res, next) => {
        try {
            if (!req.body.judul || !req.body.deskripsi) {
                return res.json({
                    status: false,
                    message: 'Judul dan deskripsi tidak boleh kosong'
                });
            }

            let result = await prisma.image.update({
                where: {
                    id: parseInt(req.params.id),
                },
                data: {
                    judul: req.body.judul,
                    deskripsi: req.body.deskripsi
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


