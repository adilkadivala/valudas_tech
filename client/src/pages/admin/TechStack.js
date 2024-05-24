import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { DeleteModal } from "./layout/Modal";
import { Trash2, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const TechStack = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { stack, setStack } = useValudasData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [techStackId, setTechStackId] = useState(null);
  const [insertTechStack, setInsertTechStack] = useState({
    technology_name: "",
  });
  const [updatetTechStack, setUpdateTechStack] = useState({
    technology_name: "",
  });

  // inserting tech stack data
  const InsertData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/poststack`, insertTechStack);
      if (response.status === 200) {
        const response = await axios.get(`${API}/getstack`);
        const finelData = response.data;
        setStack(finelData);
        setInsertTechStack({
          technology_name: "",
        });
        toast.success("insertd successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // insert input handler
  const inserHandler = async (e) => {
    const { name, value } = e.target;

    setInsertTechStack({
      ...insertTechStack,
      [name]: value,
    });
  };

  // open update modal
  const openEditModal = (techStack) => {
    setEditModalOpen(true);
    setUpdateTechStack({
      id: techStack.id,
      technology_name: techStack.service_name,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // delete Techstack
  const deleteStack = async () => {
    try {
      const response = await axios.delete(`${API}/deletestack/${techStackId}`);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getstack`);
        const finelData = response.data;
        setStack(finelData);
        closeDeleteModal();
        toast.success("deleted successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // open Delete modal
  const openDeleteModal = (techStackId) => {
    setDeleteModalOpen(true);
    setTechStackId(techStackId);
  };
  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setTechStackId(null);
  };

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
      <DeleteModal
        isDeleteOpen={deleteModalOpen}
        onCloseDelete={closeDeleteModal}
        onDelete={deleteStack}
        itemId={techStackId}
      />
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
                    <th>Operation</th>
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
                            <td>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#FD7238",
                                  marginLeft: "0.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => openDeleteModal(tech.id)}
                              >
                                <Trash2 />
                              </button>

                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#3C91E6",
                                  cursor: "pointer",
                                }}
                                onClick={() => openEditModal(tech)}
                              >
                                <Pencil />
                              </button>
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
                <h3>Insert Industry</h3>
                <i className="bx bx-plus"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  onSubmit={InsertData}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="technology_name" className="form-label">
                      Technology Name
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertTechStack.technology_name}
                      id="technology_name"
                      onChange={inserHandler}
                      name="technology_name"
                      placeholder="Enter Technology name Here"
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#3c91e6",
                        border: "none",
                        color: "#FFF",
                        marginRight: "5px",
                        padding: "7px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      // onClick={closeEditModal}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#db504a",
                        border: "none",
                        color: "#FFF",
                        cursor: "pointer",
                        marginLeft: "5px",
                        padding: "7px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>

      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "15rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflow: "hidden",
          left: "480px",
          width: "35%",
          height: "auto",
        }}
      >
        <div
          style={{
            display: "block",
            fontSize: "15px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <div>
              <button
                type="button"
                style={{
                  backgroundColor: "#db504a",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  cursor: "pointer",
                  padding: "7px 10px",
                  right: "0",
                }}
                onClick={closeEditModal}
              >
                <X />
              </button>
            </div>

            <div>
              <p>Update Tech Stack</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                // onSubmit={InsertData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="technology_name" className="form-label">
                    Technology Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updatetTechStack.technology_name}
                    id="technology_name"
                    // onChange={inserHandler}
                    name="technology_name"
                    placeholder="Enter Technology name Here"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#3c91e6",
                      border: "none",
                      color: "#FFF",
                      marginRight: "5px",
                      padding: "7px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onClick={closeEditModal}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TechStack;
