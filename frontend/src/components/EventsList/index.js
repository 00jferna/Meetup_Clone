import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import EventListItem from "./EventlistItem";

const EventsList = () => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.event.events);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(eventActions.getAllEvents()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      {loaded && (
        <ul>
          {Object.values(eventList).map((event) => (
            <div className="eventListItem__cont">
              <EventListItem event={event} key={event.id} />
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default EventsList;
