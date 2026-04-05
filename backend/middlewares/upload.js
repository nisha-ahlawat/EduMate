const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the directory to store the files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // specify the file name
  }
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return cb(new Error('Only image and pdf files are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
