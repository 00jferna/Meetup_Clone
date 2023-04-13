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
  const defaultImage = "../assets/group-cover-3-wide.webp";
  const [loaded, setLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const visibleSection = "group__events__cont";
  const hiddenSection = "group__events__cont hidden";

  useEffect(() => {
    dispatch(groupActions.getGroupDetails(groupInt)).then(() =>
      setLoaded(true)
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(groupActions.getGroupDetailEvents(groupInt)).then(() =>
      setPageLoaded(true)
    );
  }, [loaded]);

  return (
    <>
      {pageLoaded && (
        <div className="group__details__page">
          <div className="group__detailscont">
            <a className="groups__link" href="/groups">
              Groups
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
                <p>{group.private ? "Private" : "Public"}</p>
              </div>
              <h4>
                Organized by {group.Organizer ? group.Organizer.firstName : ""}{" "}
                {group.Organizer ? group.Organizer.lastName : ""}
              </h4>
              <div>
                <button>Join this group</button>
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
                  Object.keys(group.upcomingEvents).length
                    ? visibleSection
                    : hiddenSection
                }
              >
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
              <div
                className={
                  Object.keys(group.pastEvents).length
                    ? visibleSection
                    : hiddenSection
                }
              >
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
      )}
    </>
  );
};

export default GroupDetails;
