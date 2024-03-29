import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/events";
import EventListItem from "./EventlistItem";

const EventsList = () => {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.event);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(eventActions.getAllEvents(page)).then(() => setLoaded(true));
  }, [page]);

  const pageUp = () => {
    if (eventList.eventTotal == 20) setPage(page + 1);
  };
  const pageDown = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      {loaded && (
        <div>
          <ul>
            {Object.values(eventList.upcomingEvents)
              .sort((a, b) => {
                return new Date(a.startDate) - new Date(b.startDate);
              })
              .map((event) => (
                <div className="eventListItem__cont" key={event.id}>
                  <EventListItem event={event} />
                </div>
              ))}
            {Object.values(eventList.pastEvents)
              .sort((a, b) => {
                return new Date(a.startDate) - new Date(b.startDate);
              })
              .map((event) => (
                <div className="eventListItem__cont" key={event.id}>
                  <EventListItem event={event} />
                </div>
              ))}
          </ul>
          <div className="pagintion">
            <button onClick={pageDown} disabled={page > 1 ? "" : "disabled"}>
              &#x3c;
            </button>
            <p>Page {page}</p>
            <button
              onClick={pageUp}
              disabled={eventList.eventTotal == 20 ? "" : "disabled"}
            >
              &#x3e;
            </button>
          </div>
          <a className="backtotop" href="#top">
            &#94;
          </a>
        </div>
      )}
    </>
  );
};

export default EventsList;
