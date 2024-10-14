import React from "react";
import { useState } from "react";
const Header = () => {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header"); //element with class "header" selected
    header.classList.toggle("active", window.scrollY > 100); // active class is added and removed because of classList.toggle
  });

  const [ismobile, setMobile] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className="logo">
            EduQuest <b>.</b>
          </div>
          <div className="navlink">
            <ul
              className={
                ismobile ? "nav-links-mobile" : "link f_flex uppercase"
              }
            >
              <li>
                {" "}
                <a href="/">HOME</a>
              </li>
              <li>
                {" "}
                <a href="/">ABOUT</a>
              </li>
              <li>
                {" "}
                <a href="/">CONTACT</a>
              </li>
            </ul>
            <button className="toggle" onClick={() => setMobile(!ismobile)}>
              {ismobile ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
