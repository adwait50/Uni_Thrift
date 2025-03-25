const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Choose directory based on route
        const dir = file.fieldname === 'proofOfAdmission' 
            ? 'uploads/student-documents/'
            : 'uploads/tenant-documents/';
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const prefix = file.fieldname === 'proofOfAdmission' 
            ? 'ADMISSION-'
            : file.fieldname === 'proofAadhaar' 
                ? 'AADHAAR-' 
                : 'ADDRESS-';
        cb(null, `${prefix}${Date.now()}${path.extname(file.originalname)}`);
    }
});

const tenantUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Please upload only images'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = tenantUpload;