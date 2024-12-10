const uploadToCloudnary = require("../middelware/uploadMiddleware");
const fileModel = require("../models/File");


// add a new file
const storeNewFile = async (req, res) => {
  console.log(req.file);
  const {userId} = req.user
  
  const { mimetype, buffer } = req.file ;
  const name = req.body.name;

  try {
    const { secure_url } = await uploadToCloudnary(buffer);
    if (!secure_url)
      return res
        .status(500)
        .json({ message: "error while uploading file to cloud" });
    const file = new fileModel({ name, url: secure_url, type: mimetype , userId :  userId});
    const savedFile = await file.save();
    res.status(201).json({ message: "file uploaded success fully", savedFile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while seving file to data base" });
  }
};

// get a spacific file
const getSpacificFile = async (req, res) => {
  const {_id} = req.params
  const {userId} = req.user
  try {
    const file = await fileModel.findOne({_id, userId});
    if(!file) return res.status(404).json({message : "File No Found ,404"})
    res.json(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting file" });
  }
};

// get all files
const getAllFiles = async (req, res) => {
  const {userId} = req.user
  try {
    const files = await fileModel.find({userId});
    res.json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting file" });
  }
};

// remove file
const removeFile = async (req, res) => {
  console.log(req.body);
  
  try {
    const file = await fileModel.findById(req.body.fileId);
    if (!file) return res.status(404).json({ message: "file not found" });
    await fileModel.findByIdAndDelete(req.body.fileId);
    res.json({ message: "file removed success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while removing file" });
  }
};

module.exports = { storeNewFile, getAllFiles, removeFile, getSpacificFile };
