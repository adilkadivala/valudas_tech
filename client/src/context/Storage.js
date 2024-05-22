import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

  // users
  const getUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:5665/getuser");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // industry
  const getIndustryData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5665/getindustriesdata"
      );
      setIndustries(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // portfolio
  const getPortfolio = async () => {
    try {
      const response = await axios.get("http://localhost:5665/getportfolio");
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // services
  const getService = async () => {
    try {
      const response = await axios.get("http://localhost:5665/getservice");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  // stack
  const getStack = async () => {
    try {
      const response = await axios.get("http://localhost:5665/getstack");
      setStack(response.data);
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
      }}
    >
      {children}
    </ValudasData.Provider>
  );
};
