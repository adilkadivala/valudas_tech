const connectDB = require("../database/connection");

// getting slider data

const getSlider = async (req, res) => {
  try {
    const Que = `SELECT * FROM slider`;

    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "internel server error" });
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

    let image;
    if (req.files && req.files.image) {
      image = req.files.image[0].filename;
    } else {
      image = req.body.image || null;
    }

    const Que = `UPDATE slider SET image = ? WHERE id =?`;
    const data = [image, id];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "internel server error" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error);
  }
};

// deleting slider data

const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const Que = `DELETE FROM slider WHERE id = ?`;

    connectDB.query(Que, [id], (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "internel server error" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getSlider, setSlider, updateSlider, deleteSlider };
