const fs = require("fs");
const path = require("path");
const connectDB = require("../database/connection");

// getting slider data
const getSlider = async (req, res) => {
  try {
    const Que = `SELECT * FROM slider`;

    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "internal server error" });
      }

      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

// inserting data in slider
const setSlider = async (req, res) => {
  try {
    const image = req.files.image ? req.files.image[0].filename : null;

    const Que = `INSERT INTO slider (image) VALUES (?)`;
    const data = [image];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "internal server error" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
};

// updating data in slider
const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const getImageQuery = `SELECT image FROM slider WHERE id = ?`;
    connectDB.query(getImageQuery, [id], (err, results) => {
      if (err) {
        console.error(`Database error: ${err.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        const oldImage = results[0].image;

        let newImage;
        if (req.files && req.files.image) {
          newImage = req.files.image[0].filename;
        } else {
          newImage = req.body.image || null;
        }

        // Update the database record with the new image filename
        const updateQuery = `UPDATE slider SET image = ? WHERE id = ?`;
        const data = [newImage, id];

        connectDB.query(updateQuery, data, (err) => {
          if (err) {
            console.error(`Database error: ${err.message}`);
            return res.status(500).json({ message: "Internal server error" });
          }

          // If there is a new image, delete the old image file
          if (newImage && oldImage && oldImage !== newImage) {
            const oldFilePath = path.join(
              __dirname,
              "../../client/public/upload",
              oldImage
            );

            fs.access(oldFilePath, fs.constants.F_OK, (err) => {
              if (err) {
                console.error(`Old file does not exist: ${oldFilePath}`);
                return res.sendStatus(200);
              }

              // Delete the old image file
              fs.unlink(oldFilePath, (err) => {
                if (err) {
                  console.error(`Error deleting old file: ${err.message}`);
                }
                return res.sendStatus(200);
              });
            });
          } else {
            return res.sendStatus(200);
          }
        });
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// deleting slider data FS
const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the image filename from the database
    const getImageQuery = `SELECT image FROM slider WHERE id = ?`;
    connectDB.query(getImageQuery, [id], (err, results) => {
      if (err) {
        console.error(`Database error: ${err.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        const image = results[0].image;

        // Delete the record from the database
        const deleteQuery = `DELETE FROM slider WHERE id = ?`;
        connectDB.query(deleteQuery, [id], (err) => {
          if (err) {
            console.error(`Database error: ${err.message}`);
            return res.status(500).json({ message: "Internal server error" });
          }

          // Construct the file path
          const filePath = path.join(
            __dirname,
            "../../client/public/upload",
            image
          );
          // Check if the file exists
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error(`File does not exist: ${filePath}`);
              return res.status(404).json({ message: "File not found" });
            }

            // Delete the image file from the local directory
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error deleting file: ${err.message}`);
                return res
                  .status(500)
                  .json({ message: "Internal server error" });
              }

              return res.sendStatus(200);
            });
          });
        });
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSlider, setSlider, updateSlider, deleteSlider };
