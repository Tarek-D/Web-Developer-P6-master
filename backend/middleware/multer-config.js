// library to handle HTTP requests that contain multipart/form-data, which is used for file uploads.
const multer = require('multer');

// object maps MIME types to file extensions.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// specifies where to store uploaded files (in this case, the images directory) 
// and how to name them (by concatenating the original file name, a timestamp, 
// and the appropriate file extension).
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0].split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// function is called with the storage object as a configuration option. 
// The .single('image') method tells multer to expect a single file with the field name 'image' to be uploaded.
module.exports = multer({storage: storage}).single('image');