import React from "react";
import "../../assets/css/public/Query.css";

function Query() {

  
  return (
    <>
      <div className='query_section_page'>
      <div className='Consultation_page'>
           <h1>Get in Touch for a Free Consultation</h1>
           <p>After Submission, Expect a Response from Our Sales Team Within 24 Hours.</p>
      </div>
      <div className='form'>
        <form>
          <div className="form_row">
            <div className="form_group">
              <label for="inputEmail4">Your Name*</label>
              <input
                type="email"
                className="form_control"
                placeholder="Enter Your Name*"
              />
            </div>
            <div className="form_group">
              <label for="inputPassword4">Your Email*</label>
              <input
                type="text"
                className="form_control"
                placeholder="Enter Your Email*"
              />
            </div>

            <div className="form_group">
              <label for="inputPassword4">Your Phone</label>
              <input type="text" className="form_control" placeholder="+91" />
            </div>

            <div className="form_group">
              <label for="inputPassword4">Skype Id</label>
              <input
                type="text"
                className="form_control"
                placeholder="Enter Skype Id"
              />
            </div>

            <div className="form_group">
              <label for="inputPassword4">Budget</label>
              <input type="text" className="form_control" placeholder="Budget" />
            </div>

            <div className="form_group">
              <label for="inputPassword4">I prefer to</label>
              <input
                type="text"
                className="form_control"
                placeholder="I prefer to"
              />
            </div>

            <div className="form_group" id="message">
              <label for="inputPassword4">Your Message*</label>
              <input
                type="message"
                className="form_control"
                placeholder="Message*"
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
