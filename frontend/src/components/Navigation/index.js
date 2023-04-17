import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header className="main__header">
      <ul className="main__menu">
        <li>
          <NavLink exact to="/">
            <img
              className="main__header_logo"
              src="/assets/Meetup_logo.png"
            ></img>
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Navigation;
