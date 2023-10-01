const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const filesave = require('./file'); // Assuming filesave.js is in the same directory
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());
const mongodbUri = process.env.MONGODB_URI;
console.log(mongodbUri);
mongoose.connect(mongodbUri, { useNewUrlParser: true }).then(() => {
    console.log(`Connected to MongoDB`);
}).catch((err) => {
    console.error(err);
});

const productschema = new mongoose.Schema({
    productname: String,
    productlink: String,
});

const detailsSchema = new mongoose.Schema({
    title: String,
    img: String,
    Workingdetails: String,
    link: String,
    description: String,
    coding: String,
    circult: String,
    product: [productschema],
});

const Details = mongoose.model('Details', detailsSchema);

app.post('/details/post', async (req, res) => {
    const { title, link, description, coding, product, img, circult, Workingdetails } = req.body;

    const data = new Details({
        title,
        img,
        circult,
        Workingdetails,
        link,
        description,
        coding,
        product,
    });

    try {
        const savedData = await data.save();
        res.json(savedData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.get('/details/get/all', async (req, res) => {
    const fetch = await Details.find();
    try {
        res.status(200).json(fetch);
    } catch (err) {
        res.status(404).json(err);
    }
});

app.get('/details/get/:id', async (req, res) => {
    const id = req.params.id;
    const fetch = await Details.find({ _id: id }).exec();
    try {
        res.status(200).json(fetch);
    } catch (err) {
        res.json(err);
    }
});

app.put('/details/upd/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Details.findByIdAndUpdate(id, req.body);
    try {
        res.json(data).status(200);
    } catch (err) {
        res.json(err).status(404);
    }
});

app.delete('/details/delete/:id', async (req, res) => {
    const id = req.params.id;
    const data = await Details.findByIdAndDelete(id);
    try {
        res.json(data).status(200);
    } catch (err) {
        res.json(err).status(404);
    }
})

app.get('/details/search', async (req, res) => {
    const search = req.query.search; // Use req.query to access query parameters
    try {
        const data = await Details.find({ title: { $regex: new RegExp(search, 'i') } });
        if (data.length === 0) {
            res.status(404).json({ message: "No matching records found" });
        } else {
            res.status(200).json(data); // Send a 200 status with the data
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/public/material/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
const uploadHandler = upload.single('file');

// File Upload Route
app.post('/file/post', (req, res) => {
    try {
        uploadHandler(req, res, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred while uploading the file" });
            }
            if (!req.file) {
                return res.status(400).json({ message: "File not uploaded" });
            }
            return res.json(req.file.filename)
            res.status(200).json({ message: "File uploaded" });

        });
    } catch (err) {
        console.log("Error on file post", err);
    }
});

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
});
