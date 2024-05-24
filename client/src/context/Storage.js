import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

// making context
export const ValudasData = createContext();

// setting context in function
export const useValudasData = () => useContext(ValudasData);

// Context provider component
export const ValudasStorage = ({ children }) => {
  const [users, setUsers] = useState();
  const [industries, setIndustries] = useState();
  const [portfolio, setPortfolio] = useState();
  const [services, setServices] = useState();
  const [stack, setStack] = useState();
  const [portImages, setPortImages] = useState();

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
  const getStack = async () => {
    try {
      const response = await axios.get(`${API}/getstack`);
      setStack(response.data);
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

  useEffect(() => {
    getUsersList();
    getIndustryData();
    getPortfolio();
    getService();
    getStack();
    getPortImages();
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
        stack,
        setStack,
        portImages,
        setPortImages,
      }}
    >
      {children}
    </ValudasData.Provider>
  );
};
