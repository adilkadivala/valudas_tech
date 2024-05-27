const connectDB = require("../database/connection");

// getting portfolio data
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

// inserting portfolio data

const insertPortfolio = async (req, res) => {
  try {
    const {
      title,
      short_description,
      company_name,
      portfolio_photos,
      service_id,
      industry_id,
    } = req.body;
    const thumbnail = req.files.thumbnail
      ? req.files.thumbnail[0].filename
      : null;

    const Que = `INSERT into portfolio (title, short_description, company_name, service_id, industry_id, thumbnail, portfolio_photos) VALUES (?,?,?,?,?,?,?)`;

    const data = [
      title,
      short_description,
      company_name,
      service_id,
      industry_id,
      thumbnail,
      portfolio_photos,
    ];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from portfoilio insertion" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error("Error inserting portfolio", error);
    res.status(500).json({ message: "Error inserting portfolio" });
  }
};

// updating portfolio

const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const thumbnail = req.files.thumbnail
      ? req.files.thumbnail[0].filename
      : null;

    const {
      title,
      short_description,
      company_name,
      service_id,
      industry_id,
      portfolio_photos,
    } = req.body;

    const Que = `UPDATE portfolio SET thumbnail =?, title =?, short_description =?, company_name =?, service_id =?, industry_id =?, portfolio_photos =? WHERE id =?`;

    const data = [
      thumbnail,
      title,
      short_description,
      company_name,
      service_id,
      industry_id,
      portfolio_photos,
      id,
    ];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from updating portfolio" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    error.message;
  }
};

// deleting portfolio
const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const Que = `DELETE FROM portfolio WHERE id = ?`;

    connectDB.query(Que, [id], (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from deleting portfolio" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getPortfolio,
  insertPortfolio,
  updatePortfolio,
  deletePortfolio,
};
