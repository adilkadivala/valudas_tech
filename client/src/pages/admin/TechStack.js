import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";

const TechStack = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { stack, setStack } = useValudasData();

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    const handleResize = () => {
      setSidebarHidden(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Sidebar isOpen={!sidebarHidden} />
      <Navbar toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Tech stack Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Technology Name</th>
                  </tr>
                </thead>
                <tbody>
                  {stack &&
                    stack.map((tech, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{tech.id}</p>
                            </td>
                            <td>
                              <p>{tech.technology_name}</p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <i className="bx bx-plus"></i>
                <i className="bx bx-filter"></i>
              </div>
              <ul className="todo-list">
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
                <li className="not-completed">
                  <p>Todo List</p>
                  <i className="bx bx-dots-vertical-rounded"></i>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default TechStack;
