import { useEffect, useState } from "react";
import "./NewEventPage.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import * as eventActions from "../../store/events";

const NewEventPage = () => {
  const { groupId } = useParams();
  const groupInt = Number.parseInt(groupId);
  const group = useSelector((state) => state.group.groupDetails);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [privateBol, setPrivateBol] = useState("");
  const [price, setPrice] = useState("");
  const [venueId, setVenueId] = useState(1);
  const [capacity, setCapacity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.title = "Create a New Event";
  }, []);

  useEffect(() => {
    dispatch(groupActions.getGroupDetails(groupInt)).then(() =>
      setLoaded(true)
    );
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
    const errors = {};
    if (!name.length) errors["name"] = "Name is required";
    if (type == "") errors["type"] = "Group Type is required";
    if (privateBol == "") errors["privateBol"] = "Visibility Type is required";
    if (price == "") errors["price"] = "Price is required";
    if (startDate == "") errors["startDate"] = "Event start is required";
    if (endDate == "") errors["endDate"] = "Event end is required";
    const imageUrlExt = imageUrl.split(".")[1];
    const extensions = ["png", "jpg", "jpeg"];
    if (!extensions.includes(imageUrlExt))
      errors["imageUrl"] = "Image URL must end in .png, .jpg, or .jpeg";
    if (description.length <= 30)
      errors["description"] = "Description must be at least 30 characters long";
    setValidationErrors(errors);
    if (group.Venues.length) venueId = group.Venues.length[0];
    const event = {
      name,
      type,
      price,
      venueId,
      capacity,
      description,
      startDate,
      endDate,
    };

    return createNewEvent(event);
  };

  const createNewEvent = (event) => {
    if (!Object.values(validationErrors).length) {
      dispatch(eventActions.createEvent(group.id, event)).then((res) => {
        history.push(`/events/${res.id}`);
        setValidationErrors({});
      });
    }
  };

  return (
    <>
      {loaded && (
        <div className="event__create__cont">
          <form onSubmit={handleSubmit}>
            <div className="event__create__section">
              <h3>Create an event for {group.name}</h3>
              <h2>What is the name of your event? </h2>
              <input
                placeholder="Event Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              {validationErrors.name && (
                <div className="error">{validationErrors.name}</div>
              )}
            </div>
            <div className="event__create__section">
              <p>Is this an in person or online event?</p>
              <select
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">(Select One)</option>
                <option value="In person">In Person</option>
                <option value="Online">Online</option>
              </select>
              {validationErrors.type && (
                <div className="error">{validationErrors.type}</div>
              )}
              <p>Is this event private or public?</p>
              <select
                type="text"
                value={privateBol}
                onChange={(e) => setPrivateBol(e.target.value)}
              >
                <option value="">(Select One)</option>
                <option value={true}>Private</option>
                <option value={false}>Public</option>
              </select>
              {validationErrors.privateBol && (
                <div className="error">{validationErrors.privateBol}</div>
              )}
              <p>What is the price for your event?</p>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              {validationErrors.price && (
                <div className="error">{validationErrors.price}</div>
              )}
            </div>
            <div className="event__create__section">
              <p>When does your event start?</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
              {validationErrors.startDate && (
                <div className="error">{validationErrors.startDate}</div>
              )}
              <p>When does your event end?</p>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></input>
              {validationErrors.endDate && (
                <div className="error">{validationErrors.endDate}</div>
              )}
            </div>
            <div className="event__create__section">
              <p>Please add in image url for your event below:</p>
              <input
                placeholder="Image Url"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              ></input>
              {validationErrors.imageUrl && (
                <div className="error">{validationErrors.imageUrl}</div>
              )}
            </div>
            <div className="event__create__section">
              <p>Please describe your event:</p>
              <textarea
                placeholder="Please include at least 30 characters."
                type="text"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {validationErrors.description && (
                <div className="error">{validationErrors.description}</div>
              )}
            </div>
            <button className="event__create__button">Create Event</button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewEventPage;
