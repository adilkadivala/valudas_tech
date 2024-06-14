import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Index from "../pages/public/Index";
import Users from "../pages/admin/Users";
import Industries from "../pages/admin/Industries";
import Portfolio from "../pages/admin/Portfolio";
import Services from "../pages/admin/Services";
import Technologies from "../pages/admin/Technologies";
import PortImages from "../pages/admin/PortfolioImages";
import Slider from "../pages/admin/Slider";

const Pathes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Index />} />

      {/* Admin Dashboard Route */}
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="industries" element={<Industries />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="services" element={<Services />} />
        <Route path="technologies" element={<Technologies />} />
        <Route path="portimage" element={<PortImages />} />
        <Route path="slider" element={<Slider />} />
      </Route>
    </Routes>
  );
};

export default Pathes;
