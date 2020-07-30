import React from "react";
import AppRoutes from "./appRouting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = function () {
  return (
    <div className="container">
      <AppRoutes></AppRoutes>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
