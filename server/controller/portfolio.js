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
    const { title, short_description, company_name, service_id, industry_id } =
      req.body;
    const thumbnail = req.files["thumbnail"]
      ? req.files["thumbnail"][0].filename
      : null;
    const portfolio_photos = req.files["portfolio_photos"]
      ? req.files["portfolio_photos"][0].filename
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
          .json({ message: "Error inserting portfolio data" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

// updating portfolio
const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, short_description, company_name, service_id, industry_id } =
      req.body;
    const image = req.file.filename;

    const Que = `UPDATE portfolio SET image =?, title =?, short_description =?, company_name =?, service_id =?, industry_id =? WHERE id =?`;

    const data = [
      title,
      short_description,
      company_name,
      service_id,
      industry_id,
      image,
      id,
    ];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from updating portfolio" });
      }
      return res.json(data);
    });
  } catch (error) {
    error.message;
  }
};

// deleting portfolio
const deletePortfolio = async () => {
  try {
    const { id } = req.params;

    const Que = `DELETE FROM portfolio WHERE id = ?`;

    connectDB.query(Que, [id], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from deleting portfolio" });
      }
      return res.json(data);
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
