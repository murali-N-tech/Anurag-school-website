const Gallery = require('../models/Gallery');
const ImageKit = require('imagekit');

// Initialize ImageKit with your .env keys
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

// @desc    Get ImageKit authentication parameters
// @route   GET /api/gallery/auth
exports.getAuthParams = (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).json(result); // Change res.send to res.status(200).json
  } catch (error) {
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

// @desc    Get all gallery images
// @route   GET /api/gallery
exports.getGallery = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Save new image to database
// @route   POST /api/gallery
exports.addPhoto = async (req, res) => {
  try {
    const { url, fileId } = req.body;
    
    // Count existing to set the next order index
    const count = await Gallery.countDocuments();
    
    const newPhoto = new Gallery({
      imageUrl: url,
      fileId: fileId,
      order: count
    });

    const savedPhoto = await newPhoto.save();
    res.status(201).json(savedPhoto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update image order (Drag and Drop)
// @route   PUT /api/gallery/reorder
exports.reorderGallery = async (req, res) => {
  const { ids } = req.body; // Array of Mongo IDs in new order
  try {
    const updatePromises = ids.map((id, index) => 
      Gallery.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updatePromises);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete photo from DB and ImageKit
// @route   DELETE /api/gallery/:id
exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileId } = req.query;

    // 1. Delete from ImageKit Cloud
    if (fileId) {
      await imagekit.deleteFile(fileId);
    }

    // 2. Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: "Photo removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};