import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import { DeleteModal } from "./layout/Modal";
import { Trash2, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import "../../assets/css/admin/main.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Services = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { services, setServices } = useValudasData();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertService, setInsertService] = useState({
    service_name: "",
    services_id: "",
  });
  const [updateService, setUpdateService] = useState({
    service_name: "",
    services_id: "",
  });
  const [serviceId, setServiceId] = useState(null);

  // inserting service
  const insertServiceData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/postservice`, insertService);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservice`);
        const finelData = response.data;
        setServices(finelData);
        setInsertService({
          service_name: "",
          services_id: "",
        });
        toast.success("industry added successfully");
      } else {
        console.error("error form inserting new service");
        toast.error("service failed due to some reason");
      }
    } catch (error) {
      console.error("service Insert", error.message);
    }
  };
  // insert input handler
  const insertHandler = (e) => {
    const { name, value } = e.target;
    setInsertService({
      ...insertService,
      [name]: value,
    });
  };

  // updating services
  const updateServicesData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API}/updateservice/${updateService.id}`,
        updateService
      );

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservice`);
        const finelData = response.data;
        setServices(finelData);
        setUpdateService({
          service_name: "",
          services_id: "",
        });
        closeEditModal();
        toast.success("Services Updated successfully");
      } else {
        console.error("Error from Services new Services");
        toast.error("Updating Services failed due to some reason");
      }
    } catch (error) {
      console.error("Error from Services new collection", error);
      toast.error("Updating Services failed due to some reason");
    }
  };

  // update input handler
  const updateHandler = (e) => {
    const { name, value } = e.target;
    setUpdateService({
      ...updateService,
      [name]: value,
    });
  };

  // open update modal
  const openEditModal = (service) => {
    setEditModalOpen(true);
    setUpdateService({
      id: service.id,
      service_name: service.service_name,
      services_id: service.services_id,
    });
  };

  // close update modal
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // open Delete modal
  const openDeleteModal = (serviceId) => {
    setDeleteModalOpen(true);
    setServiceId(serviceId);
  };
  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setServiceId(null);
  };

  // delete Service
  const deleteService = async () => {
    try {
      const response = await axios.delete(`${API}/deleteservice/${serviceId}`);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservice`);
        const refresh = await response.data;
        setServices(refresh);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
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
        onDelete={deleteService}
        itemId={serviceId}
      />

      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Services Page</h1>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Services Data</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Service Name</th>
                    <th>Service Id</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {services &&
                    services.map((service, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{service.id}</p>
                            </td>
                            <td>
                              <p>{service.service_name}</p>
                            </td>
                            <td>
                              <p>{service.services_id}</p>
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
                                onClick={() => openDeleteModal(service.id)}
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
                                onClick={() => openEditModal(service)}
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
                <h3>Insert Services</h3>
                <i className="bx bx-plus"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="todo-list">
                <form
                  method="post"
                  encType="multipart/form-data"
                  name="edit form"
                  onSubmit={insertServiceData}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="service_name" className="form-label">
                      Service Name
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertService.service_name}
                      id="service_name"
                      onChange={insertHandler}
                      name="service_name"
                      placeholder="Enter Industry name Here"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="services_id" className="form-label">
                      Industry Id
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertService.services_id}
                      id="services_id"
                      onChange={insertHandler}
                      name="services_id"
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
              <p>Update Services</p>
              <br />
              <form
                method="post"
                encType="multipart/form-data"
                name="edit form"
                // onSubmit={updateServicesData}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="service_name" className="form-label">
                    Service Name
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateService.service_name}
                    id="service_name"
                    onChange={updateHandler}
                    name="service_name"
                    placeholder="Enter Service name Here"
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="services_id" className="form-label">
                    Industry Id
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateService.services_id}
                    id="services_id"
                    onChange={updateHandler}
                    name="services_id"
                    placeholder="Enter services id Here"
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
                    type="button"
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      cursor: "pointer",
                      marginLeft: "5px",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                    onClick={updateServicesData}
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

export default Services;
