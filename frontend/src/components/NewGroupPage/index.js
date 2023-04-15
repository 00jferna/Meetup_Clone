import { useEffect, useState } from "react";
import "./NewGroupPage.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as groupActions from "../../store/groups";

const NewGroupPage = () => {
  const [location, setLocation] = useState("");
  const [locationChanged, setLocationChanged] = useState(false);
  const [name, setName] = useState("");
  const [nameChanged, setNameChanged] = useState(false);
  const [about, setAbout] = useState("");
  const [aboutChanged, setAboutChanged] = useState(false);
  const [type, setType] = useState("");
  const [typeChanged, setTypeChanged] = useState(false);
  const [privateBol, setPrivateBol] = useState("");
  const [privateBolChanged, setPrivateBolChanged] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrlChanged, setImageUrlChanged] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
    let [city, state] = location.split(",");

    const errors = {};
    if (!location.length) errors["location"] = "Location is required";
    if (!name.length) errors["name"] = "Name is required";
    if (about.length <= 30)
      errors["about"] = "Description must be at least 30 characters long";
    if (type == "") errors["type"] = "Group Type is required";
    if (privateBol == "") errors["privateBol"] = "Visibility Type is required";
    const imageUrlExt = imageUrl.split(".")[1];
    const extensions = ["png", "jpg", "jpeg"];
    if (!extensions.includes(imageUrlExt))
      errors["imageUrl"] = "Image URL must end in .png, .jpg, or .jpeg";
    setValidationErrors(errors);
    const group = {
      city,
      state,
      name,
      about,
      type,
      privateBol,
      imageUrl,
    };
    return createNewGroup(group);
  };

  const createNewGroup = (group) => {
    if (!Object.values(validationErrors).length) {
      dispatch(groupActions.createGroup(group)).then((res) => {
        history.push(`/groups/${res.id}`);
        setValidationErrors({});
      });
    }
  };

  return (
    <>
      <div className="group__create__cont">
        <form onSubmit={handleSubmit}>
          <div className="group__create__section">
            <h3>Become an Organizer</h3>
            <h2>
              We'll walk you through a few steps to build your local community
            </h2>
          </div>
          <div className="group__create__section">
            <h2>First, set your group's location</h2>
            <p>
              Meetup groups meet locally, in person, and online. We'll connect
              you with people in your area.
            </p>
            <input
              placeholder="City, STATE"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
            {validationErrors.location && (
              <div className="error">{validationErrors.location}</div>
            )}
          </div>
          <div className="group__create__section">
            <h2>What will your group's name be?</h2>
            <p>
              Choose a name that will give people a clear idea of what the group
              is about. Feel free to get creative! You can edit this later if
              you change your mind.
            </p>
            <input
              placeholder="What is your group name?"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {validationErrors.name && (
              <div className="error">{validationErrors.name}</div>
            )}
          </div>
          <div className="group__create__section">
            <h2>Now describe what your group will be about</h2>
            <p>
              People will see this when we promote your group, but you'll be
              able to add to it later, too.
            </p>
            <ol>
              <li>What's the purpose of the group?</li>
              <li>Who should join?</li>
              <li>What will you do at your events?</li>
            </ol>
            <input
              placeholder="Please write at least 30 characters"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></input>
            {validationErrors.about && (
              <div className="error">{validationErrors.about}</div>
            )}
          </div>
          <div className="group__create__section">
            <h2>Final steps...</h2>
            <p>Is this an in person or online group?</p>
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
            <p>Is this group private or public?</p>
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
            <p>Please add an image url for your group below:</p>
            <input
              placeholder="Image Url"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            ></input>
            {validationErrors.imageUrl && (
              <div className="error">{validationErrors.imageUrl}</div>
            )}
          </div>
          <div className="group__create__section">
            <button>Create Group</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewGroupPage;
