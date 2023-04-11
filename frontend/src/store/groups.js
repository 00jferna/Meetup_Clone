const initialState = {}

export default function groupsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLGROUPS:
      newState.groups = action.item.Groups;
      return newState;
    default:
      return newState;
  }
}

const SETALLGROUPS = "groups/SETALLGROUPS";

export const setGroups = (item) => {
  return {
    type: SETALLGROUPS,
    item,
  };
};

export const getAllGroups = () => async (dispatch) => {
  const res = await fetch("/api/groups", {
    method: "GET",
  });

  const data = await res.json();
  dispatch(setGroups(data));
  return res;
};
