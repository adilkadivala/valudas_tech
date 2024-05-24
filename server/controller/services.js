const connectDB = require("../database/connection");

// get
const getServices = async (req, res) => {
  try {
    const Que = `SELECT * FROM services`;
    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from getting services" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "intrnal server error " });
  }
};

//post
const postServices = async (req, res) => {
  try {
    const { service_name, services_id } = req.body;
    const Que = `INSERT INTO services (service_name, services_id) VALUES (?,?)`;
    const data = [service_name, services_id];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from posting services " });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// update
const updateServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, services_id } = req.body;
    const Que =
      "UPDATE `services` SET `service_name`=?, `services_id`=? WHERE `id`=?";

    const data = [service_name, services_id, id];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from updating services" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(err.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// delete
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const Que = `DELETE FROM services WHERE id = ?`;

    connectDB.query(Que, [id], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got form deleting service" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal serever error" });
  }
};

module.exports = {
  getServices,
  postServices,
  updateServices,
  deleteService,
};
