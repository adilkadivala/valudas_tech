import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

// making context
export const ValudasData = createContext();

// setting context in function
export const useValudasData = () => useContext(ValudasData);

// Context provider component
export const ValudasStorage = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [services, setServices] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [portImages, setPortImages] = useState([]);
  const [serviceTechnology, setServicesTechnology] = useState([]);

  // users
  const getUsersList = async () => {
    try {
      const response = await axios.get(`${API}/getuser`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // industry
  const getIndustryData = async () => {
    try {
      const response = await axios.get(`${API}/getindustriesdata`);
      setIndustries(response.data);
    } catch (error) {
      console.error("Error fetching industry data:", error);
    }
  };

  // portfolio
  const getPortfolio = async () => {
    try {
      const response = await axios.get(`${API}/getportfolio`);
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // services
  const getService = async () => {
    try {
      const response = await axios.get(`${API}/getservice`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // stack
  const getTechnology = async () => {
    try {
      const response = await axios.get(`${API}/getstack`);
      setTechnology(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // Port Images
  const getPortImages = async () => {
    try {
      const response = await axios.get(`${API}/getphotos`);
      setPortImages(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // service and technology

  const getServiceTechnology = async () => {
    try {
      const response = await axios.get("http://localhost:5665/getservicetech");
      setServicesTechnology(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsersList();
    getIndustryData();
    getPortfolio();
    getService();
    getTechnology();
    getPortImages();
    getServiceTechnology();
  }, []);

  return (
    <ValudasData.Provider
      value={{
        users,
        setUsers,
        industries,
        setIndustries,
        portfolio,
        setPortfolio,
        services,
        setServices,
        technology,
        setTechnology,
        portImages,
        setPortImages,
        serviceTechnology,
        setServicesTechnology,
      }}
    >
      {children}
    </ValudasData.Provider>
  );
};
