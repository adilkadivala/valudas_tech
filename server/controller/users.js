const connectDB = require("../database/connection");

// getting users data
const getUsers = async (req, res) => {
  try {
    const Que = `SELECT * FROM users`;

    connectDB.query(Que, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got form user getting logic" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// posting user data
const postUsers = async (req, res) => {
  try {
    const { name, email, mobile_no, skype_id, budget, prefer, message } =
      req.body;

    const Que = `INSERT INTO users (name, email, mobile_no, skype_id, budget, prefer, message) VALUES (?,?,?,?,?,?,?)`;
    const data = [name, email, mobile_no, skype_id, budget, prefer, message];

    connectDB.query(Que, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from posting users data" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

// updating user data
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, mobile_no } = req.body;

    const Que = `UPDATE users SET first_name =?, last_name =?, email =?, mobile_no =? WHERE id = ?`;
    const data = [first_name, last_name, email, mobile_no, id];

    connectDB.query(Que, data, (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "update user" });
      }
      return res.sendStatus(200);
    });
  } catch (error) {
    console.error(error.message);
  }
};

// deleteing users data
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const Que = `DELETE FROM users WHERE id = ?`;

    connectDB.query(Que, [id], (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "error got from deleting user " });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  getUsers,
  postUsers,
  updateUser,
  deleteUsers,
};
