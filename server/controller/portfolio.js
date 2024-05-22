const connectDB = require("../database/connection");

const getPortfolio = async (req, res) => {
  try {
    const Que = `SELECT * FROM portfolio`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting portfolio" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

module.exports = {
  getPortfolio,
};
