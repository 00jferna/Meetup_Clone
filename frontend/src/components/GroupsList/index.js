import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import GroupListItem from "./GrouplistItem";

const GroupsList = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.group.groups);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(groupActions.getAllGroups(page)).then(() => setLoaded(true));
  }, [page]);

  const pageUp = () => {
    if (Object.values(groupList).length == 20) setPage(page + 1);
  };
  const pageDown = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      {loaded && (
        <div>
          <ul>
            {Object.values(groupList).map((group) => (
              <GroupListItem group={group} key={group.id} loaded={loaded} />
            ))}
          </ul>
          <div className="pagintion">
            <button onClick={pageDown} disabled={page > 1 ? "" : "disabled"}>
              &#x3c;
            </button>
            <p>Page {page}</p>
            <button
              onClick={pageUp}
              disabled={Object.values(groupList).length == 20 ? "" : "disabled"}
            >
              &#x3e;
            </button>
          </div>
          <a className="backtotop" href="#top">
            &#94;
          </a>
        </div>
      )}
    </>
  );
};

export default GroupsList;
