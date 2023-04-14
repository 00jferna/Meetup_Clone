import { csrfFetch } from "./csrf";

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLEVENTS:
      newState.events = action.item;
      return newState;
    case SETEVENTDETAILS:
      newState.eventDetails = action.item
      return newState;
    default:
      return newState;
  }
}

const SETALLEVENTS = "events/SETALLEVENTS";
const SETEVENTDETAILS = "events/SETEVENTDETAILS";

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

export const getAllEvents = () => async (dispatch) => {
  const res = await csrfFetch("/api/events", {
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
