import React, { useState } from "react";
import { useValudasData } from "../../context/Storage";
import "../../assets/css/public/Query.css";
import axios from "axios";
import { toast } from "react-toastify";

const API = process.env.REACT_APP_API_URL;

function Query() {
  const { setUsers } = useValudasData();
  const [postQuery, setPostQuery] = useState({
    name: "",
    email: "",
    mobile_no: "",
    skype_id: "",
    budget: "",
    prefer: "",
    message: "",
  });

  // posting data in database

  const sendData = async (e) => {
    e.preventDefault();
    if (
      postQuery.name === "" &&
      postQuery.email === "" &&
      postQuery.mobile_no === "" &&
      postQuery.budget === "" &&
      postQuery.message === ""
    ) {
      toast.error("jkkdfj");
      return;
    }

    if (postQuery.name.length < 2 || postQuery.name.length > 20) {
      toast.error("name Should be prpper");
      return;
    }
    if (
      !postQuery.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("email address doesn't match");
      return;
    }

    if (postQuery.mobile_no.length < 10 || postQuery.name.length > 10) {
      toast.error("mobile no Should be validate");
      return;
    }

    try {
      const response = await axios.post(`${API}/postuser`, postQuery);

      if (response.status === 200) {
        setUsers(response.data);
        setPostQuery({
          name: "",
          email: "",
          mobile_no: "",
          skype_id: "",
          budget: "",
          prefer: "",
          message: "",
        });
        toast.success("Your information submitted succesfully");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const inputHandler = async (e) => {
    const { name, value } = e.target;
    setPostQuery({
      ...postQuery,
      [name]: value,
    });
  };

  return (
    <>
      <div className="query_section_page">
        <div className="Consultation_page">
          <h1>Get in Touch for a Free Consultation</h1>
          <p>
            After Submission, Expect a Response from Our Sales Team Within 24
            Hours.
          </p>
        </div>
        <div className="form">
          <form onSubmit={sendData}>
            <div className="form_row">
              <div className="form_group">
                <label for="name">Your Name*</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Enter Your Name*"
                  name="name"
                  value={postQuery.name}
                  onChange={inputHandler}
                />
              </div>
              <div className="form_group">
                <label for="email">Your Email*</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Enter Your Email*"
                  name="email"
                  value={postQuery.email}
                  onChange={inputHandler}
                />
              </div>

              <div className="form_group">
                <label for="mobile_no">Your Phone</label>
                <input
                  type="number"
                  className="form_control"
                  placeholder="+91"
                  name="mobile_no"
                  value={postQuery.mobile_no}
                  onChange={inputHandler}
                />
              </div>

              <div className="form_group">
                <label for="skype_id">Skype Id</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="Enter Skype Id"
                  name="skype_id"
                  value={postQuery.skype_id}
                  onChange={inputHandler}
                />
              </div>

              <div className="form_group">
                <label for="budget">Budget</label>
                <input
                  type="number"
                  className="form_control"
                  placeholder="Budget"
                  name="budget"
                  onChange={inputHandler}
                  value={postQuery.budget}
                />
              </div>

              <div className="form_group">
                <label for="prefer">I prefer to</label>
                <input
                  type="text"
                  className="form_control"
                  placeholder="I prefer to"
                  name="prefer"
                  value={postQuery.prefer}
                  onChange={inputHandler}
                />
              </div>

              <div className="form_group" id="message">
                <label for="message">Your Message*</label>
                <input
                  type="message"
                  className="form_control"
                  placeholder="Message*"
                  name="message"
                  value={postQuery.message}
                  onChange={inputHandler}
                />
              </div>
              <button className="query_button">Send Inquiry</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Query;
