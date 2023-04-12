import EventGroupHeader from "../EventGroupHeader";
import EventsList from "../EventsList";
import "./EventsPage.css";

const EventPage = () => {
  return (
    <div className="event__groupcont">
      <EventGroupHeader page="events" />
      <h3 className="events__subheader">Events in Meetup</h3>
      <EventsList />
    </div>
  );
};

export default EventPage;
