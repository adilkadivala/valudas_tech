import React from "react";
import { BrowserRouter } from "react-router-dom";
import Pathes from "./routes/Pathes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Pathes />
      </BrowserRouter>
    </>
  );
};

export default App;
