import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../services/helper";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import {useParams} from "react-router-dom"

const Profile = () => {
  const {id} = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [occupation, setOccupation] = useState();
  const [gender, setGender] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [contact, setContact] = useState();
  const [userData, setUserData] = useState(user);

  // Get single user
  const getUser = async () => {
    const { data } = await axios.get(
      `${BACKEND_URL}/api/users/get-user/${user._id}`
      
    );
    
    setFname(data.fname);
    setEmail(data.email);
    setAddress(data.address);
    setOccupation(data.occupation);
    setDateOfBirth(data.dateOfBirth);
    setGender(data.gender);
    setContact(data.contact);
    setUserData(data.userData)
  };

  useEffect(() => {
    getUser();
  }, []);

  // Update single user
 

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/users/update-user/${user._id}`,
        {
          fname,
          email,
          address,
          gender,
          dateOfBirth,
          occupation,
          contact,
        }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setUserData({ ...userData, user: data?.updatedUser });
        let ls = localStorage.getItem("user");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("user", JSON.stringify(ls));
        navigate("/dashboard");
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete User
  const deleteUser = async () => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product ? "
      );
      if (!answer) return;
      const { data } = await axios.delete(
        `${BACKEND_URL}/api/users/delete-user/${user._id}`
      );
      if(data.error){
        toast.error("Something went wrong")
      }else{
        
        
        navigate("/");
      }
      
      toast.success("User Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>PROFILE</h1>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id=""
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                disabled
              />
            </div>

            <div className="form_input">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Your Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                id=""
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
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
                onChange={(e) => setGender(e.target.value)}
                style={{ cursor: "pointer" }}
              />
              Male
              <input
                type="radio"
                name="gender"
                id=""
                value="Female"
                onChange={(e) => setGender(e.target.value)}
                style={{ cursor: "pointer" }}
              />
              Female
            </div>
            <div className="form_input">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                id=""
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Enter Your Date of Birth"
              />
            </div>
            <div className="form_input">
              <label htmlFor="contact">Contact Number</label>
              <input
                type="Number"
                name="contact"
                id=""
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter Your Contact Number"
              />
            </div>
            <button className="btn" onClick={updateUser}>
              UPDATE
            </button>
            <button
              className="btn"
              style={{ backgroundColor: "#ff474c" }}
              onClick={deleteUser}
            >
              DELETE
            </button>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Profile;
