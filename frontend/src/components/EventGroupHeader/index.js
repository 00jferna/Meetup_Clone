import "./EventGroupHeader.css";

const EventGroupHeader = ({ page }) => {
  let eventLinkClass = "inactive__page";
  let groupLinkClass = "inactive__page";
  
  if (page === "events") {
    eventLinkClass = "active__page";
  } else if (page === "groups") {
    groupLinkClass = "active__page";
  }

  return (
    <>
      <div className="event__group__headercont">
        <a href="./events" className={eventLinkClass}>
          <h2>Events</h2>
        </a>
        <a href="./groups" className={groupLinkClass}>
          <h2>Groups</h2>
        </a>
      </div>
    </>
  );
};

export default EventGroupHeader;
