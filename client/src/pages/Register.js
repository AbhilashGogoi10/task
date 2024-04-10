import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../services/Apis";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/mix.css";
import Header from "../components/Header";

const Register = () => {
  const [passhow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
    address: "",
    occupation: "",
    dateOfBirth: "",
    contact: "",
    gender: ""
  });

  const navigate = useNavigate();

  // setinputvalue
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  // register data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password, address, occupation, contact, dateOfBirth, gender} = inputdata;

    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("password length minimum 6 character");
    } else if (address === "") {
      toast.error("Enter Your Address");
    } else if (occupation === "") {
      toast.error("Enter Your Occupation");
    } else if (gender === "") {
      toast.error("Enter Your Gender");
    } else if (dateOfBirth === "") {
      toast.error("Enter Your Date Of Birth");
    } else if (contact === "") {
      toast.error("Enter Your Contact");
    } else {
      const response = await registerfunction(inputdata);

      if (response.status === 200) {
        setInputdata({ ...inputdata, fname: "", email: "", password: "", address: "",
        occupation: "",
        dateOfBirth: "",
        contact: "",
        gender: "" 
      });
        navigate("/");
      } else {
        toast.error(response.response.data.error);
      }
    }
  };

  return (
    <>
   <Header/>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Register</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using USER MANAGER to manage your
              profile! We hope that you will get like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passhow ? "password" : "text"}
                  name="password"
                  id=""
                  onChange={handleChange}
                  placeholder="Enter Your password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Occupation"
              />
            </div>
              <div className="form_input" style={{ display: "flex" }}>
              <label htmlFor="gender">Gender</label>
              <input
                type="radio"
                name="gender"
                id=""
                value="Male"
                onChange={handleChange}
                style={{cursor: "pointer"}}
              />
              Male
              <input
                type="radio"
                name="gender"
                id=""
                value="Female"
                onChange={handleChange}
                style={{cursor: "pointer"}}
              />
              Female
            </div>
            <div className="form_input">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Date of Birth"
              />
            </div>
            <div className="form_input">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="Number"
                name="contact"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Contact Number"
              />
            </div>
            <button className="btn" onClick={handleSubmit}>
              REGISTER
            </button>
            <p>Already have an account?  <NavLink to="/">Login</NavLink></p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
