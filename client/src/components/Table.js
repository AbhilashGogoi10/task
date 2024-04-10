import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../src/services/helper";
import Navbar from "./Navbar";

const Table = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/get-users`);

      setUsers(response?.data);
    } catch (error) {
      console.log("Error while fetching users: ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user-table">
        <h1 style={{ margin: "30px", textAlign: "center" }}>DASHBOARD</h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">GENDER</th>
              <th scope="col">OCCUPATION</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, i) => {
              return (
                <tr key={u.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{u.fname}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>{u.occupation}</td>
                  <td>{u.address}</td>
                  <td>{u.contact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
