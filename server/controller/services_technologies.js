const connectDB = require("../database/connection");

// Get services with their associated technologies
const getService_technologies = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id AS service_id, 
        s.service_name, 
        s.service_tagline, 
        s.service_description, 
        GROUP_CONCAT(t.technology_name SEPARATOR ', ') AS technologies
      FROM 
        services s
      LEFT JOIN 
        service_technology st ON s.id = st.services_id
      LEFT JOIN 
        technologies t ON st.technology_id = t.id
      GROUP BY 
        s.id, s.service_name, s.service_tagline, s.service_description
    `;

    connectDB.query(query, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error retrieving services with technologies" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// posting data
const postService_technologies = async (req, res) => {
  try {
    const { service_name, service_tagline, service_description, technologies } =
      req.body;

    const serviceQuery = `INSERT INTO services (service_name, service_tagline, service_description) VALUES (?, ?, ?)`;
    const serviceData = [service_name, service_tagline, service_description];

    connectDB.query(serviceQuery, serviceData, async (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Error posting service" });
      }

      const serviceId = result.insertId;

      if (technologies && technologies.length > 0) {
        try {
          const insertMappingsQuery = `INSERT INTO service_technology (services_id, technology_id) VALUES ?`;
          const mappingData = technologies.map((techId) => [serviceId, techId]);

          connectDB.query(insertMappingsQuery, [mappingData], (err) => {
            if (err) {
              console.error(err.message);
              return res
                .status(500)
                .json({ message: "Error linking technologies to service" });
            }
            return res.sendStatus(200);
          });
        } catch (error) {
          console.error(error.message);
          return res.status(500).json({ message: "Internal server error" });
        }
      } else {
        return res.sendStatus(200);
      }
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// deleting data
const deleteService_technologies = async (req, res) => {
  try {
    const { id: service_id } = req.params;
    console.log(req.params); // Ensure the correct service_id is being logged

    const deleteMappingsQuery = `DELETE FROM service_technology WHERE services_id = ?`;
    const deleteServiceQuery = `DELETE FROM services WHERE id = ?`;

    // Delete the mappings first
    connectDB.query(deleteMappingsQuery, [service_id], (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error deleting technology links" });
      }
      // return res.sendStatus(200);

      // Then delete the service
      connectDB.query(deleteServiceQuery, [service_id], (err) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ message: "Error deleting service" });
        }

        return res.sendStatus(200);
      });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// updating data
const updateService_technologies = async (req, res) => {
  try {
    const { service_name, service_tagline, service_description, technologies } =
      req.body;
    const { id: service_id } = req.params;
    console.log(req.params);

    const serviceQuery = `UPDATE services SET service_name = ?, service_tagline = ?, service_description = ? WHERE id = ?`;
    const serviceData = [
      service_name,
      service_tagline,
      service_description,
      service_id,
    ];

    connectDB.query(serviceQuery, serviceData, async (err) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Error updating service" });
      }

      const deleteMappingsQuery = `DELETE FROM service_technology WHERE services_id = ?`;
      connectDB.query(deleteMappingsQuery, [service_id], async (err) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .json({ message: "Error deleting old technology links" });
        }

        if (technologies && technologies.length > 0) {
          const insertMappingsQuery = `INSERT INTO service_technology (services_id, technology_id) VALUES ?`;
          const mappingData = technologies.map((techId) => [
            service_id,
            techId,
          ]);

          connectDB.query(insertMappingsQuery, [mappingData], (err) => {
            if (err) {
              console.error(err.message);
              return res
                .status(500)
                .json({ message: "Error linking technologies to service" });
            }
            return res.sendStatus(200);
          });
        } else {
          return res.sendStatus(200);
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getService_technologies,
  postService_technologies,
  deleteService_technologies,
  updateService_technologies,
};
