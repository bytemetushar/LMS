// import path from 'path';
// import multer from 'multer';

// const upload = multer({
//     dest: "uploads/",
//     limits:{fileSize: 50*1024*1024}, //50MB in max size limit
//     storage: multer.diskStorage({
//         destination: (req, file, cb)=>{
//             cb(null, file.originalname);
//         },
//     }),
//     fileFilter: (_req, file, cb)=>{
//         let ext = path.extname(file.originalname);

//         if(
//             ext !== '.jpg' &&
//             ext !== '.jpeg' &&
//             ext !== '.webp' &&
//             ext !== '.png' &&
//             ext !== '.mp4'
//         ){
//             cb(new Error('File type is not supported'), false);
//             return;
//         }
//         cb(null, true);
//     },
// });





import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

export default upload;
