const multer = require('multer');
const path = require('path');
// ! Agar file upload successful ho jaata hai, toh multer internally req.file object bana deta hai jisme file ki sari info hoti hai:

/**
 * ? Example of req.file:
{
    fieldname: 'image',
    originalname: 'myphoto.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/uploads',
    filename: '1719332549932.png', // <- Ye line important hai
    path: 'public/uploads/1719332549932.png',
    size: 201231
}
 */


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // cb == callback
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit
    },
    fileFilter: fileFilter
});

module.exports = upload;