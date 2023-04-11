import "./EventGroupHeader.css";

const EventGroupHeader = () => {
  return (
    <>
      <div className="event__group__headercont">
        <a className="inactive__page">
          <h2>Events</h2>
        </a>
        <a className="active__page">
          <h2>Groups</h2>
        </a>
      </div>
    </>
  );
};

export default EventGroupHeader;