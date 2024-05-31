import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { useValudasData } from "../../context/Storage";
import { DeleteModal } from "./layout/Modal";
import { Trash2, Pencil, X, CloudDownload } from "lucide-react";
import { toast } from "react-toastify";
import CKEditor from "react-ckeditor-component";
import "../../assets/css/admin/main.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

const Services = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const {
    serviceTechnology,
    setServicesTechnology,
    technology,
    setTechnology,
  } = useValudasData();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [insertService, setInsertService] = useState({
    service_name: "",
    service_tagline: "",
    service_description: "",
    technologies: [],
  });

  const [updateService, setUpdateService] = useState({
    service_name: "",
    service_tagline: "",
    service_description: "",
    technologies: [],
  });

  const closeEditModal = () => setEditModalOpen(false);
  const openInsertModal = () => setInsertModalOpen(true);
  const closeInsertModal = () => setInsertModalOpen(false);
  const toggleSidebar = () => setSidebarHidden(!sidebarHidden);

  // inserting service
  const insertServiceData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/setservicetech`, insertService);

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservicetech`);
        const finelData = response.data;
        setServicesTechnology(finelData);
        setTechnology(finelData);
        setInsertService({
          service_name: "",
          service_tagline: "",
          service_description: "",
          technologies: "",
        });
        closeInsertModal();
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

  // handlind input for ckeditor
  const handleEditorChange = (content, setState) => {
    setState((prevState) => ({
      ...prevState,
      service_description: content,
    }));
  };

  // updating services
  const updateServicesData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API}/updateservicetech/${updateService.service_id}`,
        {
          ...updateService,
          technologies: Array.isArray(updateService.technologies)
            ? updateService.technologies
            : [updateService.technologies],
        }
      );

      if (response.status === 200) {
        const response = await axios.get(`${API}/getservicetech`);
        const finelData = response.data;
        setServicesTechnology(finelData);

        setUpdateService({
          service_name: "",
          service_tagline: "",
          service_description: "",
          technologies: "",
        });
        closeEditModal();
        toast.success("Services Updated successfully");
      } else {
        console.error("Error from Services new Services");
        toast.error("Updating Services failed due to some reason");
      }
    } catch (error) {
      console.error("Error from Services UPDATING", error);
      toast.error("Updating Services failed due to some reason");
    }
  };

  // open update modal
  const openEditModal = (service) => {
    setEditModalOpen(true);
    setUpdateService({
      service_id: service.service_id,
      service_name: service.service_name,
      service_tagline: service.service_tagline,
      service_description: service.service_description,
      technologies: service.technologies,
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
      const response = await axios.delete(
        `${API}/deleteservicetech/${serviceId}`
      );
      if (response.status === 200) {
        const response = await axios.get(`${API}/getservicetech`);
        const refresh = await response.data;
        setServicesTechnology(refresh);
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
            <button
              className="btn-download"
              style={{
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={openInsertModal}
            >
              <CloudDownload />
              <span className="text">Open Gallery</span>
            </button>
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
                    <th>Technologis</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceTechnology && serviceTechnology.length > 0 ? (
                    serviceTechnology.map((service, index) => {
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
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: service.service_description || "null",
                                }}
                              />
                            </td>
                            <td>
                              <p>{service.technologies}</p>
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
                                onClick={() =>
                                  openDeleteModal(service.service_id)
                                }
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
          </div>
        </main>
      </section>

      {/* insert modal */}
      <div
        style={{
          display: insertModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "4rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflowX: "auto",
          left: "480px",
          width: "35%",
          height: "37rem",
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
                onClick={closeInsertModal}
              >
                <X />
              </button>
            </div>

            <div>
              <p>Insert Services</p>
              <br />

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

                  <CKEditor
                    content={insertService.service_description}
                    events={{
                      change: (e) =>
                        handleEditorChange(
                          e.editor.getData(),
                          setInsertService
                        ),
                    }}
                    config={{ enterMode: 2, shiftEnterMode: 1 }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="technologies" className="form-label">
                    Select Technologies
                  </label>
                  <select
                    id="technologies"
                    multiple
                    value={insertService.technologies}
                    onChange={(e) =>
                      setInsertService({
                        ...insertService,
                        technologies: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                    style={{ padding: "12px 5px", fontSize: "15px" }}
                  >
                    <option defaultValue="Select Technology">
                      Select Technology
                    </option>
                    {technology &&
                      technology.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                          {tech.technology_name}
                        </option>
                      ))}
                  </select>
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
                    onClick={closeInsertModal}
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
      {/* insert modal */}

      {/* edit modal */}
      <div
        style={{
          display: editModalOpen ? "block" : "none",
          zIndex: "1",
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflowX: "auto",
          left: "480px",
          width: "35%",
          height: "35rem",
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

              <form onSubmit={updateServicesData}>
                <div>
                  <label>Service Name</label>
                  <input
                    type="text"
                    value={updateService.service_name}
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                    name="service_name"
                    placeholder="Enter Service name Here"
                  />
                </div>
                <div>
                  <label>Service Tagline</label>
                  <input
                    type="text"
                    value={updateService.service_tagline}
                    onChange={(e) => handleInputChange(e, setUpdateService)}
                    name="service_tagline"
                    placeholder="Enter Service Tagline Here"
                  />
                </div>
                <div>
                  <label>Service description</label>
                  <CKEditor
                    content={updateService.service_description}
                    events={{
                      change: (e) =>
                        handleEditorChange(
                          e.editor.getData(),
                          setUpdateService
                        ),
                    }}
                    config={{ enterMode: 2, shiftEnterMode: 1 }}
                  />
                </div>
                <div>
                  <label>Select Technologies</label>
                  <select
                    multiple
                    value={updateService.technologies}
                    onChange={(e) =>
                      setUpdateService({
                        ...updateService,
                        technologies: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                  >
                    <option defaultValue="Select Technology">
                      Select Technology
                    </option>
                    {technology &&
                      technology.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                          {tech.technology_name}
                        </option>
                      ))}
                  </select>
                </div>
                <button type="submit">Save</button>
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
