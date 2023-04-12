import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events"
import EventListItem from "./EventlistItem";

const EventsList = () => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(eventActions.getAllEvents());
  }, [dispatch]);

  return (
    <>
      {eventList && (
        <ul>
          {eventList.map((event) => (
            <EventListItem event={event} key={event.id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default EventsList;