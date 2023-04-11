import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/groups";
import { useEffect } from "react";
import GroupListItem from "../GroupsPage/GrouplistItem";

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  return (
    <>
      {groupList && (
        <ul>
          {groupList.map((group) => (
            <GroupListItem group />
          ))}
        </ul>
      )}
    </>
  );
};

export default GroupsList;
