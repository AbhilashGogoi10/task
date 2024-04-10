import React, { useState } from "react";
import "../styles/mix.css";
import { IconContext } from "react-icons";

function Header() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <h2
            style={{
              color: "white",
              marginLeft:"500px",
              alignItems: "center",
            }}
          >
            USER MANAGER
          </h2>
        </div>
        
      </IconContext.Provider>
    </>
  );
}

export default Header;
