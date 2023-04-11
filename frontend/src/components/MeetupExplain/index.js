import React, { useState, useEffect } from "react";
import "./MeetupExplain.css";
import { useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import SignupFormModal from '../SignupFormModal';


const MeetupExplainer = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (sessionUser) setLogin(true);
    if (!sessionUser) setLogin(false);
  }, [sessionUser]);

  return (
    <>
      <div className="explainer__cont">
        <h2>How Meetup works</h2>
        <p>
          Meet new people who share your interests through online and in-person
          events. It’s free to create an account.
        </p>
        <div>
          <div>
            <div>
              <img src="./assets/handsUp.svg"></img>
            </div>
            <div>
              <a href="./groups">
                <h3>See all groups</h3>
              </a>
              <p>
                Lorem ipsum adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src="./assets/ticket.svg"></img>
            </div>
            <div>
              <a href="./events">
                <h3>Find an event</h3>
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod magna aliqua.
              </p>
            </div>
          </div>
          <div>
            <div>
              <img src="./assets/joinGroup.svg"></img>
            </div>
            <div>
              <a
                className={sessionUser ? "" : "disabled__link"}
                href="./groups/new"
              >
                <h3>Start a new group</h3>
              </a>
              <p>
                Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
        <button className={sessionUser ? "disabled__item" : "join__button"}>
        <OpenModalMenuItem
              itemText="Join Meetup"
              modalComponent={<SignupFormModal />}
            />
        </button>
      </div>
    </>
  );
};

export default MeetupExplainer;
