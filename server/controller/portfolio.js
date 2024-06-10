const connectDB = require("../database/connection");

// Getting portfolio data
const getPortfolio = async (req, res) => {
  try {
    const query = `
      SELECT
        p.id,
        p.thumbnail,
        p.title,
        p.short_description,
        p.company_name,
        p.portfolio_photos,
        pst.service_id,
        pst.technology_id,
        p.industry_id
      FROM
        portfolio p
      LEFT JOIN
        port_serv_tech pst ON p.id = pst.portfolio_id
    `;
    // const query = `SELECT pst.*,pf.*,sr.*,tc.* from port_serv_tech as pst
    // INNER JOIN portfolio as pf ON pf.id=pst.portfolio_id
    // INNER JOIN services as sr ON sr.id=pst.service_id
    // INNER JOIN technologies as tc ON tc.id=pst.technology_id`;

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
      technology_id,
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

      const portfolioId = result.insertId;

      // Get technology IDs based on technology names
      const tech_id_query = `SELECT id FROM technologies WHERE technology_name IN (?)`;
      connectDB.query(tech_id_query, [technology_id], (err, techResults) => {
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
      technology_id,
    } = req.body;

 

    let thumbnail;
    if (req.files && req.files.thumbnail) {
      thumbnail = req.files.thumbnail[0].filename;
    } else {
      thumbnail = req.body.thumbnail || null;
    }

    const firstQue = `UPDATE portfolio SET thumbnail = ?, title = ?, short_description = ?, company_name = ?, portfolio_photos = ?, service_id = ?, industry_id = ? WHERE id = ?`;
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

    connectDB.query(firstQue, portfolioValues, async (err) => {
      if (err) {
        console.error("Error updating portfolio data:", err.message);
        return res
          .status(500)
          .json({ message: "Error updating portfolio data" });
      }

      let techIdValue = technology_id;
     

      if (isNaN(techIdValue)) {
        try {
          const techIdQuery = `SELECT id FROM technologies WHERE technology_name = ?`;
          const techResults = await new Promise((resolve, reject) => {
            connectDB.query(techIdQuery, [technology_id], (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          });

         

          if (techResults && techResults.length > 0) {
            techIdValue = techResults[0].id;
           
          } else {
            return res.status(400).json({ message: "Technology not found" });
          }
        } catch (error) {
          console.error("Error finding technology ID:", error.message);
          return res
            .status(500)
            .json({ message: "Error finding technology ID" });
        }
      }

      const updateJunction = `UPDATE port_serv_tech SET service_id = ?, technology_id = ? WHERE portfolio_id = ?`;
      const junctionValue = [service_id, techIdValue, id];
     

      connectDB.query(updateJunction, junctionValue, (err) => {
        if (err) {
          console.error(
            "Error updating portfolio service technology data:",
            err.message
          );
          return res.status(500).json({
            message: "Error updating portfolio service technology data",
          });
        }
        return res.sendStatus(200);
      });
    });
  } catch (error) {
    console.error("Error updating portfolio", error);
    res.status(500).json({ message: "Error updating portfolio" });
  }
};

// deleting portfolio
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
