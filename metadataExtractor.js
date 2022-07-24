const metadataExtract = require("metadata-extract");
const router = require("express").Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


//using multer to upload files
const upload = multer({ storage: storage })

router.post('/', upload.single('uploaded_file'), async (req, res) => {
    const metadata = await metadataExtract(req.file.path);
    res.json(metadata);
});


module.exports = router;