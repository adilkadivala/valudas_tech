const connectDB = require("../database/connection");

// Getting portfolio data
const getPortfolio = async (req, res) => {
  try {
    const query = `SELECT * FROM portfolio`;

    connectDB.query(query, (err, data) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error retrieving portfolio data" });
      }
      return res.json(data);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// inserting portfolio data
const insertPortfolio = async (req, res) => {
  try {
    const thumbnail = req.files.thumbnail
      ? req.files.thumbnail[0].filename
      : null;

    const {
      title,
      short_description,
      company_name,
      portfolio_photos,
      service_id,
      industry_id,
      technology_ids,
    } = req.body;

    // Insert into portfolio table
    const Que = `INSERT INTO portfolio (thumbnail, title, short_description, company_name, portfolio_photos, service_id, industry_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const portfolioData = [
      thumbnail,
      title,
      short_description,
      company_name,
      portfolio_photos,
      service_id,
      industry_id,
    ];

    connectDB.query(Que, portfolioData, (err, result) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ message: "Error inserting portfolio data" });
      }

      // Get the last inserted portfolio ID
      const portfolioId = result.insertId;

      // Get technology IDs based on technology names
      const tech_id_query = `SELECT id FROM technologies WHERE technology_name IN (?)`;
      connectDB.query(tech_id_query, [technology_ids], (err, techResults) => {
        if (err) {
          console.error(err.message);
          return res
            .status(500)
            .json({ message: "Error retrieving technology IDs" });
        }

        // Insert into port_serv_tech table for each technology
        const junc_Ids = `INSERT INTO port_serv_tech (portfolio_id, service_id, technology_id) VALUES (?, ?, ?)`;
        const insertPromises = techResults.map((tech) => {
          return new Promise((resolve, reject) => {
            connectDB.query(
              junc_Ids,
              [portfolioId, service_id, tech.id],
              (err) => {
                if (err) {
                  console.error(err.message);
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          });
        });

        Promise.all(insertPromises)
          .then(() => {
            res.status(200).json({ message: "Added successfully" });
          })
          .catch((error) => {
            console.error(error.message);
            return res
              .status(500)
              .json({ message: "Error inserting portfolio data" });
          });
      });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Updating portfolio
const updatePortfolio = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      title,
      short_description,
      company_name,
      portfolio_photos,
      service_id,
      industry_id,
      technology_ids,
    } = req.body;

    let thumbnail;
    if (req.files && req.files.thumbnail) {
      thumbnail = req.files.thumbnail[0].filename;
    } else {
      thumbnail = req.body.thumbnail || null;
    }

    const updatePortfolioQuery = `UPDATE portfolio SET thumbnail = ?, title = ?, short_description = ?, company_name = ?, portfolio_photos = ?, service_id = ?, industry_id = ? WHERE id = ?`;
    const portfolioValues = [
      thumbnail,
      title,
      short_description,
      company_name,
      portfolio_photos,
      service_id,
      industry_id,
      id,
    ];

    connectDB.query(updatePortfolioQuery, portfolioValues, (err) => {
      if (err) {
        console.error("Error updating portfolio data:", err.message);
        return res
          .status(500)
          .json({ message: "Error updating portfolio data" });
      }

      // Check if service_id or technology_ids have changed
      const checkChangesQuery = `SELECT service_id FROM portfolio WHERE id = ?`;
      connectDB.query(checkChangesQuery, [id], (err, results) => {
        if (err) {
          console.error("Error checking portfolio data:", err.message);
          return res
            .status(500)
            .json({ message: "Error checking portfolio data" });
        }

        const existingServiceId = results[0].service_id;

        // Get existing technology IDs for this portfolio
        const existingTechQuery = `SELECT technology_id FROM port_serv_tech WHERE portfolio_id = ?`;
        connectDB.query(existingTechQuery, [id], (err, existingResults) => {
          if (err) {
            console.error(
              "Error retrieving existing technology IDs:",
              err.message
            );
            return res
              .status(500)
              .json({ message: "Error retrieving existing technology IDs" });
          }

          const existingTechIds = existingResults.map(
            (result) => result.technology_id
          );

          if (
            existingServiceId === service_id &&
            JSON.stringify(existingTechIds.sort()) ===
              JSON.stringify(technology_ids.sort())
          ) {
            // No changes in service_id or technology_ids
            return res.status(200).json({
              message:
                "Updated successfully with no changes in services or technologies",
            });
          }

          // Get new technology IDs
          const techIdQuery = `SELECT id FROM technologies WHERE technology_name IN (?)`;
          connectDB.query(techIdQuery, [technology_ids], (err, techResults) => {
            if (err) {
              console.error(err.message);
              return res
                .status(500)
                .json({ message: "Error retrieving technology IDs" });
            }

            const newTechnologyIds = techResults.map((tech) => tech.id);

            // Find technology IDs to insert (new ones that are not in the existing list)
            const techIdsToInsert = newTechnologyIds.filter(
              (techId) => !existingTechIds.includes(techId)
            );

            // Find technology IDs to delete (existing ones that are not in the new list)
            const techIdsToDelete = existingTechIds.filter(
              (techId) => !newTechnologyIds.includes(techId)
            );

            // Delete old entries from the junction table
            const deletePromises = techIdsToDelete.map((techId) => {
              return new Promise((resolve, reject) => {
                const deleteJunctionQuery = `DELETE FROM port_serv_tech WHERE portfolio_id = ? AND technology_id = ?`;
                connectDB.query(deleteJunctionQuery, [id, techId], (err) => {
                  if (err) {
                    console.error(
                      "Error deleting existing junction data:",
                      err.message
                    );
                    reject(err);
                  } else {
                    resolve();
                  }
                });
              });
            });

            // Insert new entries into the junction table
            const insertPromises = techIdsToInsert.map((techId) => {
              return new Promise((resolve, reject) => {
                const insertJunctionQuery = `INSERT INTO port_serv_tech (portfolio_id, service_id, technology_id) VALUES (?, ?, ?)`;
                connectDB.query(
                  insertJunctionQuery,
                  [id, service_id, techId],
                  (err) => {
                    if (err) {
                      console.error(
                        "Error inserting into junction table:",
                        err.message
                      );
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              });
            });

            Promise.all([...deletePromises, ...insertPromises])
              .then(() => {
                res.status(200).json({ message: "Updated successfully" });
              })
              .catch((error) => {
                console.error("Error updating junction table:", error.message);
                return res
                  .status(500)
                  .json({ message: "Error updating portfolio data" });
              });
          });
        });
      });
    });
  } catch (error) {
    console.error("Error updating portfolio", error);
    res.status(500).json({ message: "Error updating portfolio" });
  }
};

// Deleting portfolio
const deletePortfolio = async (req, res) => {
  try {
    const { id: portfolio_id } = req.params;

    const deletePortServTechQuery = `DELETE FROM port_serv_tech WHERE portfolio_id = ?`;
    connectDB.query(deletePortServTechQuery, [portfolio_id], (err) => {
      if (err) {
        console.error(
          "Error deleting port_serv_tech associations:",
          err.message
        );
        return res.status(500).json({ message: "Error deleting portfolio" });
      }

      const deletePortfolioQuery = `DELETE FROM portfolio WHERE id = ?`;
      connectDB.query(deletePortfolioQuery, [portfolio_id], (err) => {
        if (err) {
          console.error("Error deleting portfolio:", err.message);
          return res.status(500).json({ message: "Error deleting portfolio" });
        }
        res.sendStatus(200);
      });
    });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPortfolio,
  insertPortfolio,
  updatePortfolio,
  deletePortfolio,
};
