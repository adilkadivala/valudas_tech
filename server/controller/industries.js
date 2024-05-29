const connectDB = require("../database/connection");

// get data
const getIndustries = async (req, res) => {
  try {
    const Que = `SELECT * FROM industries`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting industries" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

// post data
const sendIndustry = async (req, res) => {
  try {
    const { industry_name } = req.body;
    const Que = `INSERT INTO industries (industry_name) VALUES (?)`;
    const data = [industry_name];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({
          message: "error got from sending industry data in database",
        });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// update data
const updateIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const { industry_name } = req.body;
    const Que = `UPDATE industries SET industry_name =? WHERE id = ?`;
    const data = [industry_name, id];
    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from updating industry data" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete
const deleteIndustry = async (req, res) => {
  try {
    const { id } = req.params;
    const Que = `DELETE FROM industries WHERE id = ?`;

    connectDB.query(Que, [id], (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from deleting industry data" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internel server error" });
  }
};

module.exports = {
  getIndustries,
  sendIndustry,
  updateIndustry,
  deleteIndustry,
};
