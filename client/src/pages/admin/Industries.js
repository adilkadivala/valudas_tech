import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Trash2, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import { DeleteModal } from "./layout/Modal";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Industries = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { industries, setIndustries } = useValudasData([]);
  const [industryID, setIndustryID] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndustryData, setEditIndustryData] = useState({
    industry_name: "",
  });
  const [insertIndustryData, setInsertIndustryData] = useState({
    industry_name: "",
  });

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // open Delete modal
  const openDeleteModal = (industryID) => {
    setDeleteModalOpen(true);
    setIndustryID(industryID);
  };

  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setIndustryID(null);
  };

  // delete Industry
  const deleteIndustry = async () => {
    try {
      const response = await axios.delete(
        `${API}/deleteindustrydata/${industryID}`
      );

      if (response.status === 200) {
        const updateData = await axios.get(`${API}/getindustriesdata`);

        const finelData = await updateData.data;
        setIndustries(finelData);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // innsert industrydata
  const insertIndustry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/postindustrydata`,
        insertIndustryData
      );

      if (response.status === 200) {
        const newInserted = await axios.get(`${API}/getindustriesdata`);
        const finelData = newInserted.data;
        setIndustries(finelData);
        setInsertIndustryData({
          industry_name: "",
        });
        toast.success("industry added successfully");
      } else {
        console.error("error form inserting new industry");
        toast.error("industry failed due to some reason");
      }
    } catch (error) {
      console.error("Skill Update", error.message);
    }
  };

  // open update modal
  const openEditModal = (industry) => {
    setEditModalOpen(true);
    setEditIndustryData({
      id: industry.id,
      industry_name: industry.industry_name,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // update industry Logic
  const updateIndustry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API}/updateindustrydata/${editIndustryData.id}`,
        editIndustryData
      );

      if (response.status === 200) {
        const refreshData = await axios.get(`${API}/getindustriesdata`);
        const finelData = await refreshData.data;
        setEditIndustryData({
          industry_name: "",
        });
        setIndustries(finelData);
        closeEditModal();
        toast.success("industry Updated successfully");
      } else {
        console.error("Error from Industry new industry");
        toast.error("Updating industry failed due to some reason");
      }
    } catch (error) {
      console.error("Error from Industry new collection", error);
      toast.error("Updating industry failed due to some reason");
    }
  };

  // update input handler
  const updateInputHandler = (e) => {
    const { name, value } = e.target;
    setEditIndustryData({
      ...editIndustryData,
      [name]: value,
    });
  };

  const insertInputHandler = (e) => {
    const { name, value } = e.target;
    setInsertIndustryData({
      ...insertIndustryData,
      [name]: value,
    });
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
        onDelete={deleteIndustry}
        itemId={industryID}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Industry Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Industry Data</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Industry Name</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {industries && industries.length > 0 ? (
                    industries.map((industry, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <p>{industry.industry_name}</p>
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
                              onClick={() => openDeleteModal(industry.id)}
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
                              onClick={() => openEditModal(industry)}
                            >
                              <Pencil />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ color: "red" }}>
                        No portfolio data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Insert Industry</h3>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  onSubmit={insertIndustry}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="industry_name" className="form-label">
                      Industry Name
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertIndustryData.industry_name}
                      id="industry_name"
                      onChange={insertInputHandler}
                      name="industry_name"
                      placeholder="Enter Industry name Here"
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

      {/* edit modal */}
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
              <p>Update Industry</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                onSubmit={updateIndustry}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="industry_name" className="form-label">
                    Industry Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={editIndustryData.industry_name}
                    id="industry_name"
                    onChange={updateInputHandler}
                    name="industry_name"
                    placeholder="Enter Industry name Here"
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
                    onClick={updateIndustry}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
    </>
  );
};

export default Industries;
