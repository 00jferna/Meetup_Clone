import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";

const EventListItem = ({ event }) => {
  const defaultImage = "./assets/group-cover-3-wide.webp";
  const eventLink = `/events/${event.id}`;
  return (
    <>
      <a href={eventLink} className="groupListItem__cont">
        <img
          className="group__previewImage"
          src={event.previewImage ? event.previewImage : defaultImage}
        ></img>
        <div className="group__details">
          <h3>{event.name}</h3>
          <h4>
            {event.city}, {event.state}
          </h4>
          <p>{event.about}</p>
          <div className="group__details__events_private">
            <p>{event.private ? "Private" : "Public"}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default EventListItem;
