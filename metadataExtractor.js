const metadataExtract = require("metadata-extract");
const router = require("express").Router();

const multer = require('multer');



//For using piexifjs in photo.
const fs = require('fs');
const piexif = require('piexifjs');


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
    const metadatasmall = await metadataExtract(req.file.path);
    // res.json(metadata);

    // Using piexifjs in addition with the metadata-extract for image files
    if (req.file.mimetype === 'image/jpeg') {
        const getBase64DataFromJpegFile = filename => fs.readFileSync(filename).toString('binary');
        const getExifFromJpegFile = filename => piexif.load(getBase64DataFromJpegFile(filename));

        const exifData = await getExifFromJpegFile(req.file.path);

        const metadata = debugExif(exifData);
        const finalMetadata = { ...metadatasmall, ...metadata }
        res.json(finalMetadata);
        return;
    } else {
        res.json(metadatasmall);
        return;
    }
});

function debugExif(exif) {
    const finalData = {};
    for (const ifd in exif) {
        if (ifd == 'thumbnail') {
            const thumbnailData = exif[ifd] === null ? "null" : exif[ifd];
            // console.log(`- thumbnail: ${thumbnailData}`);
            // finalData.push(`thumbnail: ${thumbnailData}`);
            finalData.thumbnail = thumbnailData;
        } else {
            // console.log(`- ${ifd}`);
            for (const tag in exif[ifd]) {
                // console.log(`    - ${piexif.TAGS[ifd][tag]['name']}: ${exif[ifd][tag]}`);
                // finalData.push(`${piexif.TAGS[ifd][tag]['name']}: ${exif[ifd][tag]}`);
                finalData[`${piexif.TAGS[ifd][tag]['name']}`] = exif[ifd][tag]
            }
        }
    }
    return finalData;
}



module.exports = router;