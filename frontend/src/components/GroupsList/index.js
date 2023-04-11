import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import { useEffect } from "react";
import GroupListItem from "../GroupsPage/GrouplistItem";

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <>
      {groupList && (
        <ul>
          {groupList.map((group) => (
            <GroupListItem group={group} key={group.id} />
            // <li>{group.id}</li>
            ))}
        </ul>
      )}
    </>
  );
};

export default GroupsList;
