const express = require('express');
const multer = require('multer');
const cors = require('cors');

const uploadFile = require('./services/storage.service');
const postModel = require("./models/post.model");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ FIXED multer (IMPORTANT)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ POST API
app.post('/create-post', upload.single("image"), async (req, res) => {
  try {
    // ✅ safety check
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption
    });

    res.status(201).json({
      success: true,
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET API
app.get("/post", async (req, res) => {
  try {
    const post = await postModel.find();

    res.status(200).json({
      message: "post fetched successfully",
      post
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;