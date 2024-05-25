const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "../../client/public/upload");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const replacedStr = file.originalname.replace(/ /g, "_");
    cb(null, file.fieldname + "_" + Date.now() + "_" + replacedStr);
  },
});

const uploads = multer({ storage: storage });

module.exports = { uploads };
