import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import * as groupActions from "../../store/groups";
import OpenModalButton from "../ConfirmModals";
import * as EditItems from "../ConfirmModals/EditItems";
import "./EventDetails.css";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventInt = Number.parseInt(eventId);
  const event = useSelector((state) => state.event.eventDetails);
  const group = useSelector((state) => state.group.groupDetails);
  const user = useSelector((state) => state.session.user);
  const defaultImage = "/assets/group-cover-3-wide.webp";
  const [loaded, setLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const visibleSection = "visible";
  const hiddenSection = "hidden";

  useEffect(() => {
    dispatch(eventActions.getEventDetails(eventInt)).then(() =>
      setLoaded(true)
    );
  }, [dispatch]);

  useEffect(() => {
    if (loaded && event.Group)
      dispatch(groupActions.getGroupDetails(event.Group.id)).then(() =>
        setPageLoaded(true)
      );
  }, [loaded]);

  return (
    <>
      {pageLoaded && (
        <div className="event__details__page">
          <div className="event__details__header">
            <a href="/events">&#x3c; Events</a>
            <h2>{event.name}</h2>
            <h3>
              Hosted by {group.Organizer && group.Organizer.firstName}{" "}
              {group.Organizer && group.Organizer.lastName}
            </h3>
          </div>
          <div className="event__details__cont">
            <div className="event__details__imagecont">
              <img
                className="event__details__image"
                src={
                  event.EventImages.length ? event.EventImages[0] : defaultImage
                }
              ></img>
              <div className="event__group">
                <a href={`/groups/${event.Group.id}`}>
                  <div className="event__group__cont">
                    <img
                      className="event__group__image"
                      src={group.GroupImages ? "yes" : defaultImage}
                    ></img>
                    <div className="event__group__details">
                      <h3>{event.Group.name}</h3>
                      <h4>{group.private ? "Private" : "Public"}</h4>
                    </div>
                  </div>
                </a>
                <div className="event__details">
                  <ul>
                    <li className="event__details__time">
                      <i className="fa fa-clock"></i>
                      <ul>
                        <ul className="event__details__time">
                          <li>START</li>
                          <li>{new Date(event.startDate).toDateString()}</li>
                          <li>&#x2022;</li>
                          <li>{new Date(event.startDate).toTimeString()}</li>
                        </ul>
                        <ul className="event__details__time">
                          <li>END</li>
                          <li>{new Date(event.endDate).toDateString()}</li>
                          <li>&#x2022;</li>
                          <li>{new Date(event.endDate).toTimeString()}</li>
                        </ul>
                      </ul>
                    </li>
                    <ul className="event__details__price__location">
                      <li>
                        <i className="fa fa-dollar-sign"></i>
                      </li>
                      <li>{event.price}</li>
                    </ul>
                    <ul className="event__details__price__location">
                      <li>
                        <i className="fa fa-map-pin"></i>
                      </li>
                      <li>{event.type}</li>
                    </ul>
                  </ul>
                  <div
                    className={
                      user
                        ? group.organizerId === user.id
                          ? visibleSection
                          : hiddenSection
                        : hiddenSection
                    }
                  >
                    <button>Update</button>
                    <OpenModalButton
                      buttonText={"Delete"}
                      className="group__edit__button"
                      modalComponent={
                        <EditItems.DeleteModal type="event" event={event} />
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2>Description</h2>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
