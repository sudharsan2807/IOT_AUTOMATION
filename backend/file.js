const express = require('express')
const multer = require('multer');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use = express().json;
app.use = cors();

const filesave = () => {
    let storage = multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, './public/image')
        },
        filename: (req, file, cd) => {
            cd(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        }
    })

    let upload = multer({
        storage: storage
    })

    let uploadhandler = upload.single('file');

    app.post('/file/post', (req, res) => {
        uploadhandler(req, res, (err) => {
            if (!req.file) {
                res.status(404).json({ message: "File not upload" });
            } else {
                res.json(req.file.filename)
                console.log('file name', req.file.filename);
                res.status(200).json({ message: "file uploaded" })
            }
        })
    })
}

module.exports = filesave

filesave();