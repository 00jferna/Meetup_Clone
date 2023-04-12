import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as groupActions from "../../store/groups";

const GroupListItem = ({ group }, loaded) => {
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const defaultImage = "./assets/group-cover-3-wide.webp";
  const grouplink = `/groups/${group.id}`;

  useEffect(() => {
    dispatch(groupActions.getGroupEvents(group.id)).then(() =>
      setPageLoaded(true)
    );
  }, [loaded]);

  return (
    <>
      {pageLoaded && (
        <a href={grouplink} className="groupListItem__cont">
          <img
            className="group__previewImage"
            src={group.previewImage ? group.previewImage : defaultImage}
          ></img>
          <div className="group__details">
            <h3>{group.name}</h3>
            <h4>
              {group.city}, {group.state}
            </h4>
            <p>{group.about}</p>
            <div className="group__details__events_private">
              <p>{group.events ? Object.values(group.events).length : 0} Events</p>
              <p>{group.private ? "Private" : "Public"}</p>
            </div>
          </div>
        </a>
      )}
    </>
  );
};

export default GroupListItem;
