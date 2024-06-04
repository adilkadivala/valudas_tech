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
    const Que = `DELETE FROM technologies WHERE id = ?`;

    connectDB.query(Que, [id], (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from dleting tech stack" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getTechStack,
  postTechStack,
  updateTechStack,
  deleteTechStack,
};
