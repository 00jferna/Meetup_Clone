import EventGroupHeader from "../EventGroupHeader";
import GroupsList from "../GroupsList";
import "./GroupsPage.css";

const GroupPage = () => {
  return (
    <div className="event__groupcont">
      <EventGroupHeader page="groups" />
      <h3 className="groups__subheader">Groups in Meetup</h3>
      <GroupsList />
    </div>
  );
};

export default GroupPage;
