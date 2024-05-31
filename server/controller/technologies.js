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
    const Que = `INSERT INTO technologies (technology_name) VALUES (?)`;
    const data = [technology_name];

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
    const Que = `UPDATE  technologies SET technology_name = ? WHERE id = ?`;
    const data = [technology_name, id];

    connectDB.query(Que, data, (err, data) => {
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