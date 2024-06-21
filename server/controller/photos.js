const connectDB = require("../database/connection");
const fs = require("fs");
const path = require("path");

// getting photos
const getPhotos = async (req, res) => {
  try {
    const Que = `SELECT * FROM photos`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting photos" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// inserting photos
const insertPhotos = async (req, res) => {
  try {
    const portfolio_photo = req.file.filename;

    const Que = `INSERT INTO photos (portfolio_photo) VALUES (?)`;
    const data = [portfolio_photo];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from inserting image" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ message: "internel server error" });
  }
};

// updating photos
const updatePhotos = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio_photo = req.file.filename;

    const Que = `UPDATE photos SET portfolio_photo =?  WHERE id =?`;
    const data = [portfolio_photo, id];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from updating photos" });
      }

      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ message: "internel server error from updating photos" });
  }
};

// deleting slider data FS
const deletePhotos = async (req, res) => {
  try {
    const { id } = req.params;

    const getPhotoQuery = `SELECT portfolio_photo FROM photos WHERE id = ?`;
    connectDB.query(getPhotoQuery, [id], (err, results) => {
      if (err) {
        console.error(`Database error: ${err.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        const filePath = path.join(
          __dirname,
          "../../client/public/upload",
          results[0].portfolio_photo
        );

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(`File does not exist: ${filePath}`);
            return res.status(404).json({ message: "File not found" });
          }

          // Delete the file from the server
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err.message}`);
              return res.status(500).json({ message: "Internal server error" });
            }

            console.log(`File deleted: ${filePath}`);

            // Delete the record from the database
            const deletePhotoQuery = `DELETE FROM photos WHERE id = ?`;
            connectDB.query(deletePhotoQuery, [id], (err) => {
              if (err) {
                console.error(`Database error: ${err.message}`);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              return res.sendStatus(200);
            });
          });
        });
      } else {
        return res.status(404).json({ message: "Photo not found" });
      }
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ message: "Internal server error from deleting photos" });
  }
};

module.exports = {
  getPhotos,
  insertPhotos,
  updatePhotos,
  deletePhotos,
};
