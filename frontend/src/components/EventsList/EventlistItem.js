import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";

const EventListItem = ({ event }) => {
  const defaultImage = "/assets/group-cover-3-wide.webp";
  const eventLink = `/events/${event.id}`;

  return (
    <>
      <a href={eventLink} className="eventListItem">
        <img
          className="event__previewImage"
          src={event.previewImage ? event.previewImage : defaultImage}
        ></img>
        <div className="group__details">
          <ul className="event__datetime__cont">
            <li>{new Date(event.startDate).toDateString()}</li>
            <li>{new Date(event.startDate).toTimeString()}</li>
          </ul>
          <h3>{event.name}</h3>
          <h4>
            {event.Venue.city}, {event.Venue.state}
          </h4>
        </div>
      </a>
    </>
  );
};

export default EventListItem;
