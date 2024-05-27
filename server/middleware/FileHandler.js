const multer = require("multer");

const imageProcess = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploads = multer({ storage: imageProcess });

module.exports = { uploads };
