const initialState = { groups: { 1: null } };

export default function groupsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLGROUPS:
      newState.groups = action.item;
      return newState;
    case GETGROUPEVENTS:
      if (Object.values(action.item)[0]) {
        let ind = Object.values(action.item)[0].groupId;
        newState.groups[ind].events = action.item;
      }
      return newState;
    default:
      return newState;
  }
}

const SETALLGROUPS = "groups/SETALLGROUPS";
const GETGROUPEVENTS = "groups/GETGROUPEVENTS";

export const setGroups = (item) => {
  return {
    type: SETALLGROUPS,
    item,
  };
};

export const setGroupEvents = (item) => {
  return {
    type: GETGROUPEVENTS,
    item,
  };
};

export const getAllGroups = () => async (dispatch) => {
  const res = await fetch("/api/groups", {
    method: "GET",
  });
  const groupsObj = {};
  const data = await res.json();
  data.Groups.forEach((ele) => {
    groupsObj[ele.id] = ele;
  });
  dispatch(setGroups(groupsObj));
  return res;
};

export const getGroupEvents = (id) => async (dispatch) => {
  const res = await fetch(`/api/groups/${id}/events`);

  const groupEventsObj = {};
  const data = await res.json();
  data.Events.forEach((ele) => {
    groupEventsObj[ele.id] = ele;
  });
  dispatch(setGroupEvents(groupEventsObj));
  return res;
};
