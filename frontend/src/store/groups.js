import { csrfFetch } from "./csrf";

const initialState = {};

export default function groupsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLGROUPS:
      newState.groups = action.item;
      return newState;
    case SETGROUPEVENTS:
      if (Object.values(action.item)[0]) {
        let ind = Object.values(action.item)[0].groupId;
        newState.groups[ind].events = action.item;
      }
      return newState;
    case SETGROUPDETAILS:
      newState.groupDetails = action.item;
      return newState;
    case SETGROUPDETAILEVENTS:
      const date = new Date().toJSON();
      if (!newState.groupDetails.upcomingEvents)
        newState.groupDetails.upcomingEvents = {};
      if (!newState.groupDetails.pastEvents)
        newState.groupDetails.pastEvents = {};
      for (let id in action.item.Events) {
        if (date < action.item.Events[id].startDate) {
          newState.groupDetails.upcomingEvents[action.item.Events[id].id] =
            action.item.Events[id];
        } else {
          newState.groupDetails.pastEvents[action.item.Events[id].id] =
            action.item.Events[id];
        }
      }
      return newState;
    case DELETEGROUP:
      delete newState.groupDetails;
      return newState;
    default:
      return newState;
  }
}

const SETALLGROUPS = "groups/SETALLGROUPS";
const SETGROUPEVENTS = "groups/SETGROUPEVENTS";
const SETGROUPDETAILS = "groups/SETGROUPDETAILS";
const SETGROUPDETAILEVENTS = "groups/SETGROUPDETAILEVENTS";
const DELETEGROUP = "groups/DELETEGROUP";
const UPDATEGROUP = "groups/UPDATEGROUP";

export const setGroups = (item) => {
  return {
    type: SETALLGROUPS,
    item,
  };
};

export const setGroupEvents = (item) => {
  return {
    type: SETGROUPEVENTS,
    item,
  };
};

export const setGroupDetails = (item) => {
  return {
    type: SETGROUPDETAILS,
    item,
  };
};

export const setGroupDetailEvents = (item) => {
  return {
    type: SETGROUPDETAILEVENTS,
    item,
  };
};

export const deleteCurrentGroup = () => {
  return {
    type: DELETEGROUP,
  };
};

export const updateCurrentGroup = (item) => {
  return {
    type: UPDATEGROUP,
    item,
  };
};

export const getAllGroups = (page) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups?page=${page}`, {
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
  const res = await csrfFetch(`/api/groups/${id}/events`);

  const groupEventsObj = {};
  const data = await res.json();
  if (data.Events[0]) {
    data.Events.forEach((ele) => {
      groupEventsObj[ele.id] = ele;
    });
  }
  dispatch(setGroupEvents(groupEventsObj));
  return res;
};

export const getGroupDetails = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${id}`);

  const data = await res.json();
  dispatch(setGroupDetails(data));
  return res;
};

export const getGroupDetailEvents = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${id}/events`);

  const groupEventsObj = {};
  const data = await res.json();
  if (data.Events[0]) {
    data.Events.forEach((ele) => {
      groupEventsObj[ele.id] = ele;
    });
  }
  dispatch(setGroupDetailEvents(data));
  return res;
};

export const createGroup = (group) => async (dispatch) => {
  const { city, state, name, about, type, privateBol, imageUrl } = group;
  const res = await csrfFetch("/api/groups/", {
    method: "POST",
    body: JSON.stringify({
      city,
      state,
      name,
      about,
      type,
      private: privateBol,
      imageUrl,
    }),
  });
  const groupObj = {};
  const data = await res.json();
  groupObj[data.id] = data;
  dispatch(setGroups(groupObj));
  return data;
};

export const deleteGroup = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(deleteCurrentGroup());
  return res;
};

export const updateGroup = (group) => async (dispatch) => {
  const { city, state, name, about, type, privateBol, imageUrl } = group;
  const res = await csrfFetch(`/api/groups/${group.id}`, {
    method: "PUT",
    body: JSON.stringify({
      city,
      state,
      name,
      about,
      type,
      private: privateBol,
      imageUrl,
    }),
  });

  const data = await res.json();
  dispatch(updateCurrentGroup(data));
  return res;
};
