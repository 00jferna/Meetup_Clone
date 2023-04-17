import React, { useEffect } from "react";
import MeetupExplainer from "../MeetupExplain";
import "./LandingPage.css";

const LandingPage = () => {
  useEffect(() => {
    document.title = "My Meetup";
  }, []);

  return (
    <>
      <div className="react__div">
        <div className="landing__splash">
          <div>
            <h2>The people platform-</h2>
            <h2>Where interests become friendships</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div>
            <img src="/assets/online_events.svg"></img>
          </div>
        </div>
        <MeetupExplainer />
      </div>
    </>
  );
};

export default LandingPage;
