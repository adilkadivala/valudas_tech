import React, { useState, useEffect } from "react";
import Navbar from "../admin/layout/Navbar";
import Sidebar from "../admin/layout/Sidebar";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/admin/main.css";
import { DeleteModal } from "./layout/Modal";
import axios from "axios";

const Users = () => {
  const [sidebarHidden, setSidebarHidden] = useState(window.innerWidth < 768);
  const [isDarkMode, setDarkMode] = useState(false);
  const { users, setUsers } = useValudasData();
  const [userId, setUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  // open Delete modal
  const openDeleteModal = (userId) => {
    setDeleteModalOpen(true);
    setUserId(userId);
  };
  
  // close Delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserId(null);
  };

  // delete user

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5665/deleteuser/${userId}`
      );
      console.log(userId, 44);
      if (response.status === 200) {
        const updateData = await axios.get("http://localhost:5665/getuser");
        const finalData = await updateData.data;
        setUsers(finalData);
        closeDeleteModal();
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.error(error.message);
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
        onDelete={deleteUser}
        itemId={userId}
      />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Users Page</h1>
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((user, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <p>{user.first_name}</p>
                            </td>
                            <td>
                              <p>{user.last_name}</p>
                            </td>
                            <td>
                              <p>{user.email}</p>
                            </td>
                            <td>
                              <p>{user.mobile_no}</p>
                            </td>
                            <td>
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#FD7238",
                                  cursor: "pointer",
                                }}
                                onClick={() => openDeleteModal(user.id)}
                              >
                                <Trash2 />
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

export default Users;
