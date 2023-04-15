import React from "react";
import { deleteGroup } from "../../store/groups";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export const DeleteModal = (item) => {
  const type = item.type;
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const onClickYes = () => {
    if (type === "group") {
      dispatch(deleteGroup(item.group.id))
        .then(closeModal)
        .then(history.push("/groups"));
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
