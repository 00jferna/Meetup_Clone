import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events"

export const DeleteModal = (item) => {
  const type = item.type;
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const onClickYes = () => {
    if (type === "group") {
      dispatch(groupActions.deleteGroup(item.group.id))
        .then(closeModal)
        .then(history.push("/groups"));
    }

    if (type === "event") {
      const groupId = item.event.Group.id;
      dispatch(eventActions.deleteEvent(item.event.id))
        .then(closeModal)
        .then(history.push(`/groups/${groupId}`));
    }
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this {type}?</p>
      <ul className="confirm__delete__list">
        <li>
          <button className="confirm__delete" onClick={onClickYes}>
            Yes (Delete {type})
          </button>
          <button className="confirm__delete" onClick={closeModal}>
            No (Keep {type})
          </button>
        </li>
      </ul>
    </div>
  );
};
