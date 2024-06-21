const fs = require("fs");
const path = require("path");
const connectDB = require("../database/connection");

// get
const getTechStack = async (req, res) => {
  try {
    const Que = `SELECT * FROM technologies`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting TechStack" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// post
const postTechStack = async (req, res) => {
  try {
    const { technology_name } = req.body;

    const tech_photo = req.files.tech_photo
      ? req.files.tech_photo[0].filename
      : null;

    const Que = `INSERT INTO technologies (technology_name,tech_photo) VALUES (?,?)`;
    const data = [technology_name, tech_photo];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from post techstack" });
      }

      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// update
const updateTechStack = async (req, res) => {
  try {
    const { id } = req.params;
    const { technology_name } = req.body;

    let tech_photo;

    if (req.files && req.files.tech_photo) {
      tech_photo = req.files.tech_photo[0].filename;
    } else {
      tech_photo = req.body.tech_photo || null;
    }
    const Que = `UPDATE technologies SET technology_name = ?, tech_photo =?  WHERE id = ?`;
    const data = [technology_name, tech_photo, id];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from update teh stack" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "error got from update teh stack" });
  }
};

// delete
const deleteTechStack = async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the image filename from the database
    const getImageQuery = `SELECT tech_photo FROM technologies WHERE id = ?`;
    connectDB.query(getImageQuery, [id], (err, results) => {
      if (err) {
        console.error(`Database error: ${err.message}`);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length > 0) {
        const image = results[0].tech_photo;

        // Delete the record from the database
        const deleteQuery = `DELETE FROM technologies WHERE id = ?`;
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

module.exports = {
  getTechStack,
  postTechStack,
  updateTechStack,
  deleteTechStack,
};
