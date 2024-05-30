const connectDB = require("../database/connection");

const getService_technologies = async (req, res) => {
  try {
    const Que = "SELECT * FROM service_technology WHERE services_id = 112";

    connectDB.query(Que, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getService_technologies };
