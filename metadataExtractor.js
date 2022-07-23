const metadataExtract = require("metadata-extract");

const router = require("express").Router();

router.post('/', async (req, res) => {
    if (req.files) {
        console.log(req.files);
        const metadata = await metadataExtract(req.files.file.name);
        const fileInfo = {
            "File name": req.files.file.name,
            "File size": `${req.files.file.size} bytes`,
            "File type": req.files.file.mimetype,
            "File Extension": metadata.extension,
            "Temporary file path": req.files.file.tempFilePath,
            "File encoding": req.files.file.encoding,
            "MD5 (message-digest algorithm)": req.files.file.md5
        }
        res.json(fileInfo);
        // const {data, ...others} = req.files.file;
        // res.json(others)
    }
})

module.exports = router;