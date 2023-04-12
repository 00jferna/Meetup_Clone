import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import GroupListItem from "./GrouplistItem";

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.group.groups);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(groupActions.getAllGroups()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      {loaded && (
        <ul>
          {Object.values(groupList).map((group) => (
            <GroupListItem group={group} key={group.id} loaded={loaded} />
          ))}
        </ul>
      )}
    </>
  );
};

export default GroupsList;
