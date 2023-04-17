import { csrfFetch } from "./csrf";

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLEVENTS:
      const date = new Date().toJSON();
      newState.upcomingEvents = {};
      newState.pastEvents = {};
      for (let id in action.item) {
        if (date < action.item[id].startDate) {
          newState.upcomingEvents[action.item[id].id] = action.item[id];
        } else {
          newState.pastEvents[action.item[id].id] = action.item[id];
        }
      }
      newState.eventTotal = Object.keys(action.item).length;
      return newState;
    case SETEVENTDETAILS:
      newState.eventDetails = action.item;
      return newState;
    case DELETEEVENT:
      delete newState.eventDetails;
      return newState;
    default:
      return newState;
  }
}

const SETALLEVENTS = "events/SETALLEVENTS";
const SETEVENTDETAILS = "events/SETEVENTDETAILS";
const CREATEEVENT = "groups/CREATEEVENT";
const DELETEEVENT = "events/DELETEEVENT";

export const setEvents = (item) => {
  return {
    type: SETALLEVENTS,
    item,
  };
};

export const setEventDetails = (item) => {
  return {
    type: SETEVENTDETAILS,
    item,
  };
};

export const createGroupEvent = (item) => {
  return {
    type: CREATEEVENT,
    item,
  };
};

export const deleteCurrentEvent = () => {
  return {
    type: DELETEEVENT,
  };
};

export const getAllEvents = (page) => async (dispatch) => {
  const res = await csrfFetch(`/api/events?page=${page}`, {
    method: "GET",
  });
  const eventsObj = {};
  const data = await res.json();
  if (data.Events[0]) {
    data.Events.forEach((ele) => {
      eventsObj[ele.id] = ele;
    });
  }
  dispatch(setEvents(eventsObj));
  return res;
};

export const getEventDetails = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${id}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(setEventDetails(data));
  return res;
};

export const createEvent = (id, event) => async (dispatch) => {
  const {
    name,
    type,
    price,
    venueId,
    capacity,
    description,
    startDate,
    endDate,
  } = event;

  const res = await csrfFetch(`/api/groups/${id}/events`, {
    method: "POST",
    body: JSON.stringify({
      name,
      type,
      price,
      venueId,
      capacity,
      description,
      startDate,
      endDate,
    }),
  });
  const data = await res.json();
  return data;
};

export const deleteEvent = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${id}`, { method: "DELETE" });

  const data = await res.json();
  dispatch(deleteCurrentEvent());
  return res;
};
