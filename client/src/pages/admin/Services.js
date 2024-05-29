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
  const { services, setServices, serviceParent, setServicesParent, stack } =
    useValudasData();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertService, setInsertService] = useState({
    service_name: "",
    service_tagline: "",
    service_description: "",
    services_id: "",
    tech_stack_id: "",
  });

  const [updateService, setUpdateService] = useState({
    service_name: "",
    service_tagline: "",
    service_description: "",
    services_id: "",
    tech_stack_id: "",
  });
  const [serviceId, setServiceId] = useState(null);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => setIsCheckboxChecked(!isCheckboxChecked);
  const closeEditModal = () => setEditModalOpen(false);
  const toggleSidebar = () => setSidebarHidden(!sidebarHidden);

  // inserting service
  const insertServiceData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/postservice`, insertService);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservice`);
        const finelData = response.data;
        setServices(finelData);
        setServicesParent(finelData);
        setInsertService({
          service_name: "",
          service_tagline: "",
          service_description: "",
          services_id: "",
          tech_stack_id: "",
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
  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        setServicesParent(finelData);
        setUpdateService({
          service_name: "",
          service_tagline: "",
          service_description: "",
          services_id: "",
          tech_stack_id: "",
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

  // open update modal
  const openEditModal = (service) => {
    setEditModalOpen(true);
    setUpdateService({
      id: service.id,
      service_name: service.service_name,
      service_tagline: service.service_tagline,
      service_description: service.service_description,
      services_id: service.services_id,
      tech_stack_id: service.tech_stack_id,
    });
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
        setServicesParent(refresh);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
    }
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
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Tagline</th>
                    <th>Service Description</th>
                    <th>Parent Service</th>
                    <th>Technologies</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {services && services.length > 0 ? (
                    services.map((service, index) => {
                      const parent =
                        serviceParent &&
                        serviceParent.find(
                          (parent) => parent.id === service.services_id
                        );

                      const technology =
                        stack &&
                        stack.find((tech) => tech.id === service.tech_stack_id);

                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{service.service_name}</p>
                            </td>
                            <td>
                              <p>{service.service_tagline}</p>
                            </td>
                            <td>
                              <p>{service.service_description}</p>
                            </td>
                            <td>
                              <p>{parent ? parent.service_name : "NULL"}</p>
                            </td>
                            <td>
                              <p>
                                {technology
                                  ? technology.technology_name
                                  : "NULL"}
                              </p>
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
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ color: "red" }}>
                        No services data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="todo">
              <div className="head">
                <h3>Insert Services</h3>
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
                      onChange={(e) => handleInputChange(e, setInsertService)}
                      name="service_name"
                      placeholder="Enter Service name Here"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="service_tagline" className="form-label">
                      Service Tagline
                    </label>
                    <input
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertService.service_tagline}
                      id="service_tagline"
                      onChange={(e) => handleInputChange(e, setInsertService)}
                      name="service_tagline"
                      placeholder="Enter Service Tagline Here"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="service_description" className="form-label">
                      Service description
                    </label>
                    <textarea
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertService.service_description}
                      id="service_description"
                      onChange={(e) => handleInputChange(e, setInsertService)}
                      name="service_description"
                      placeholder="Enter Service description name Here"
                    />
                  </div>

                  <div
                    className="mb-3"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="tech_stack_id" className="form-label">
                      Choose Technology
                    </label>
                    <select
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={insertService.tech_stack_id}
                      id="tech_stack_id"
                      name="tech_stack_id"
                      onChange={(e) => handleInputChange(e, setInsertService)}
                    >
                      <option value="">Select Technology</option>
                      {stack &&
                        stack.map((tech) => {
                          return (
                            <option key={tech.id} value={tech.id}>
                              {tech.technology_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  {isCheckboxChecked && (
                    <div
                      className="mb-3"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label htmlFor="service_id" className="form-label">
                        Choose Service
                      </label>
                      <select
                        style={{ padding: "12px 5px", fontSize: "15px" }}
                        type="text"
                        className="form-control"
                        value={insertService.services_id}
                        id="service_id"
                        name="services_id"
                        onChange={(e) => handleInputChange(e, setInsertService)}
                      >
                        <option value="" selected={"Select Parent Service"}>
                          Select Parent Service
                        </option>
                        {serviceParent &&
                          serviceParent.map((parent) => {
                            return (
                              <option key={parent.id} value={parent.id}>
                                {parent.service_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  )}

                  <div className=" ">
                    <br />
                    <input
                      id="check"
                      name="check"
                      type="checkbox"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      id="check"
                      htmlFor="check"
                      style={{ cursor: "pointer" }}
                    >
                      Save As a Child
                    </label>
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
                      onClick={() =>
                        setInsertService({ service_name: "", services_id: "" })
                      }
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
          top: "10rem",
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
                onSubmit={updateServicesData}
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
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                    name="service_name"
                    placeholder="Enter Service name Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="service_tagline" className="form-label">
                    Service Tagline
                  </label>
                  <input
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateService.service_tagline}
                    id="service_tagline"
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                    name="service_tagline"
                    placeholder="Enter Service Tagline Here"
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="service_description" className="form-label">
                    Service description
                  </label>
                  <textarea
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateService.service_description}
                    id="service_description"
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                    name="service_description"
                    placeholder="Enter Service description name Here"
                  />
                </div>

                <div
                  className="mb-3"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label htmlFor="tech_stack_id" className="form-label">
                    Choose Technology
                  </label>
                  <select
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                    type="text"
                    className="form-control"
                    value={updateService.tech_stack_id}
                    id="tech_stack_id"
                    name="tech_stack_id"
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                  >
                    <option value="">Select Technology</option>
                    {stack &&
                      stack.map((tech) => {
                        return (
                          <option key={tech.id} value={tech.id}>
                            {tech.technology_name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                {isCheckboxChecked && (
                  <div
                    className="mb-3"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <label htmlFor="service_id" className="form-label">
                      Choose Service
                    </label>
                    <select
                      style={{ padding: "12px 5px", fontSize: "15px" }}
                      type="text"
                      className="form-control"
                      value={updateService.services_id}
                      id="services_id"
                      onChange={(e) => handleInputChange(e, setUpdateService)}
                      name="services_id"
                    >
                      <option value="" selected={"Remove Parent"}>
                        Remove Parent
                      </option>
                      {serviceParent &&
                        serviceParent.map((parent) => {
                          return (
                            <option key={parent.id} value={parent.id}>
                              {parent.service_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}

                <div className=" ">
                  <br />
                  <input
                    id="check"
                    name="check"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    id="check"
                    htmlFor="check"
                    style={{ cursor: "pointer" }}
                  >
                    Save As a Child
                  </label>
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
