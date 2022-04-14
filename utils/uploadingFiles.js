const multer = require("multer");

// Comprobamos que el archivo sea .csv
const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("text/csv")) {
    cb(null, true);
  } else {
    cb("Please upload onli csv files.", false);
  }
};

// Disk storage:
/*
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "resources"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
*/

// Memory storage:

const storage = multer.memoryStorage();

const upload = multer({ storage, fileFilter: csvFilter });
module.exports = upload;
