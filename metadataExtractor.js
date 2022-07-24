const metadataExtract = require("metadata-extract");
const router = require("express").Router();

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


//using multer to upload files
const upload = multer({ storage: storage })

// const upload = multer({ dest: './public/data/uploads/', preservePath: true })
router.post('/', upload.single('uploaded_file'), async (req, res) => {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    // console.log(req.file, req.body)
    console.log(req.file);
    const metadata = await metadataExtract(req.file.path);
    res.json(metadata);
});


module.exports = router;