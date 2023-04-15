import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import EventListItem from "../EventsList/EventlistItem";
import "./GroupDetails.css";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groupInt = Number.parseInt(groupId);
  const group = useSelector((state) => state.group.groupDetails);
  const user = useSelector((state) => state.session.user);
  const defaultImage = "/assets/group-cover-3-wide.webp";
  const [loaded, setLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const visibleSection = "visible";
  const hiddenSection = "hidden";

  useEffect(() => {
    dispatch(groupActions.getGroupDetails(groupInt)).then(() =>
      setLoaded(true)
    );
  }, [dispatch]);

  useEffect(() => {
    if (loaded)
      dispatch(groupActions.getGroupDetailEvents(groupInt)).then(() =>
        setPageLoaded(true)
      );
  }, [loaded]);

  const onClick = (e) => {
    e.preventDefault();
    return;
  };

  if (pageLoaded) console.log(user.id, group.organizerId);
  return (
    <>
      {pageLoaded && (
        <div className="group__details__page">
          <div className="group__detailscont">
            <a className="groups__link" href="/groups">
              &#x3c; Groups
            </a>
          </div>
          <div className="group__detailscont">
            <div className="group__imagecont">
              <img
                className="group__image"
                src={group.GroupImages ? "yes" : defaultImage}
              ></img>
            </div>
            <div className="group__details">
              <h3>{group.name}</h3>
              <h4>
                {group.city}, {group.state}
              </h4>
              <div className="group__details__events_private">
                <p>
                  {group.pastEvents && group.upcomingEvents
                    ? Object.keys(group.upcomingEvents).length +
                      Object.keys(group.pastEvents).length
                    : "0"}{" "}
                  Events
                </p>
                <p>&#x2022;</p>
                <p>{group.private ? "Private" : "Public"}</p>
              </div>
              <h4>
                Organized by {group.Organizer ? group.Organizer.firstName : ""}{" "}
                {group.Organizer ? group.Organizer.lastName : ""}
              </h4>
              <div
                className={
                  user
                    ? group.organizerId === user.id
                      ? hiddenSection
                      : visibleSection
                    : hiddenSection
                }
              >
                <button onClick={onClick} className="group__join__button">
                  Join this group
                </button>
              </div>
              <div
                className={
                  user
                    ? group.organizerId === user.id
                      ? visibleSection
                      : visibleSection
                    : hiddenSection
                }
              >
                <button className="group__edit__button">Create Event</button>
                <button className="group__edit__button">Update</button>
                <button className="group__edit__button">Delete</button>
              </div>
            </div>
          </div>
          <div className="group__desc__cont">
            <div>
              <div className="group__desc">
                <h3>Organizer</h3>
                <h4>
                  {group.Organizer ? group.Organizer.firstName : ""}{" "}
                  {group.Organizer ? group.Organizer.lastName : ""}
                </h4>
                <h3>What we're about</h3>
                <p>{group.about}</p>
              </div>
              <div
                className={
                  group.upcomingEvents &&
                  (Object.keys(group.upcomingEvents).length
                    ? visibleSection
                    : hiddenSection)
                }
              >
                <div className="group__events__cont">
                  <h3>
                    Upcoming Events (
                    {group.upcomingEvents
                      ? Object.keys(group.upcomingEvents).length
                      : "0"}
                    )
                  </h3>
                  <ul>
                    {group.upcomingEvents &&
                      Object.values(group.upcomingEvents).map((event) => (
                        <div
                          key={event.id}
                          className="group__eventListItem__cont"
                        >
                          <EventListItem event={event} />
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
              <div
                className={
                  group.upcomingEvents &&
                  (Object.keys(group.upcomingEvents).length
                    ? visibleSection
                    : hiddenSection)
                }
              >
                <div className="group__events__cont">
                  <h3>
                    Past Events (
                    {group.pastEvents
                      ? Object.keys(group.pastEvents).length
                      : "0"}
                    )
                  </h3>
                  <ul>
                    {group.pastEvents &&
                      Object.values(group.pastEvents).map((event) => (
                        <div
                          key={event.id}
                          className="group__eventListItem__cont"
                        >
                          <EventListItem event={event} />
                        </div>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupDetails;
