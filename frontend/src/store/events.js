const initialState = {};

export default function eventsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SETALLEVENTS:
      newState.events = action.item;
      return newState;
    default:
      return newState;
  }
}

const SETALLEVENTS = "events/SETALLEVENTS";

export const setEvents = (item) => {
  return {
    type: SETALLEVENTS,
    item,
  };
};

export const getAllEvents = () => async (dispatch) => {
  const res = await fetch("/api/events", {
    method: "GET",
  });
  const eventsObj = {};
  const data = await res.json();
  data.Events.forEach((ele) => {
    eventsObj[ele.id] = ele;
  });
  dispatch(setEvents(eventsObj));
  return res;
};
