import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { DeleteModal, EditModal } from "./layout/Modal";
import axios from "axios";

const Industries = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { industries, setIndustries } = useValudasData();
  const [industryID, setIndustryID] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndustryData, setEditIndustryData] = useState({
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
        `http://localhost:5665/deleteindustrydata/${industryID}`
      );

      if (response.status === 200) {
        const updateData = await axios.get(
          "http://localhost:5665/getindustriesdata"
        );

        const finelData = await updateData.data;
        setIndustries(finelData);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // open update moal
  const openEditModal = (industry) => {
    setEditModalOpen(true);
    setEditIndustryData({
      ...editIndustryData,
      // id: industry.id,
      industry_name: industry.industry_name,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // update industry Logic
  const updateIndustry = async () => {
    try {
      const response = axios.put(
        `http://localhost:5665/updateindustrydata/${editIndustryData.id}`
      );
      if (response.status === 200) {
        setEditIndustryData({
          industry_name: "",
        });

        const refreshData = await axios.get(
          "http://localhost:5665/getindustriesdata"
        );
        setIndustries(refreshData.data);
        toast.success("Industry updated successfully");
        closeEditModal();
      } else {
        console.error("error form Industry new collection");
        toast.error("updating Industry failed due to some reason");
      }
    } catch (error) {
      console.error("error form Industry new collection");
      toast.error("updating Industry failed due to some reason");
    }
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
      <EditModal
        isEditOpen={editModalOpen}
        onCloseEdit={closeEditModal}
        onSave={updateIndustry}
        formData={editIndustryData}
        setFormData={setEditIndustryData}
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
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Industry Name</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {industries &&
                    industries.map((industry, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{industry.id}</p>
                            </td>
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

export default Industries;
