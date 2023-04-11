const GroupListItem = ({ group }) => {
  const defaultImage = "./assets/group-cover-3-wide.webp";
  const grouplink = `/groups/${group.id}`
  return (
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
          <p>{group.id} Events</p>
          <p>{group.private ? "Private" : "Public"}</p>
        </div>
      </div>
    </a>
  );
};

export default GroupListItem;
