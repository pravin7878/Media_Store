const express = require("express");
const multer = require("multer");
const {
  storeNewFile,
  getAllFiles,
  removeFile,
  getSpacificFile,
} = require("../controlers/file.controler");
const chackAuth = require("../middelware/chackAuth");
const fileRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// store a new file
fileRouter.post("/",chackAuth, upload.single("file"), storeNewFile);

// get all files
fileRouter.get("/",chackAuth, getAllFiles);

// get all files
fileRouter.get("/:_id",chackAuth, getSpacificFile);

// remove file
fileRouter.delete("/", removeFile);

module.exports = fileRouter;
