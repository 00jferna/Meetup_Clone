import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import "./EditGroupPage.css";

const EditGroupPage = () => {
  const { groupId } = useParams();
  const group = useSelector((state) => state.group.groupDetails);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [privateBol, setPrivateBol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [pageLoad, setPageLoaded] = useState(false);

  useEffect(() => {
    document.title = "Update My Group";
  }, []);

  useEffect(() => {
    dispatch(groupActions.getGroupDetails(groupId))
      .then(() => {
        setLoaded(true);
      })
      .then(() => {
        setLocation(`${group.city}, ${group.state}`);
        setName(group.name);
        setAbout(group.about);
        setType(group.type);
        setPrivateBol(group.private);
        setImageUrl(group.Groupimage ? group.Groupimage[0] : "");
      });
  }, [dispatch]);

  useEffect(() => {
    if (loaded && group.organizerId !== user.id) history.push(`/`);
  }, [loaded]);

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
    let imageUrlExt = "";
    if (imageUrl) {
      imageUrlExt = imageUrl.split(".")[imageUrl.split(".").length - 1];
    }
    const extensions = ["png", "jpg", "jpeg"];
    if (!extensions.includes(imageUrlExt))
      errors["imageUrl"] = "Image URL must end in .png, .jpg, or .jpeg";
    setValidationErrors(errors);
    const group = {
      id: groupId,
      city,
      state,
      name,
      about,
      type,
      privateBol,
      imageUrl,
    };
    return updateCurrGroup(group);
  };

  const updateCurrGroup = (group) => {
    if (!Object.values(validationErrors).length) {
      dispatch(groupActions.updateGroup(group)).then((res) => {
        history.push(`/groups/${group.id}`);
        setValidationErrors({});
      });
    }
  };

  return (
    <>
      {loaded && (
        <div className="group__edit__cont">
          <form onSubmit={handleSubmit}>
            <div className="group__edit__section">
              <h3>UPDATE YOUR GROUP'S INFORMATION</h3>
              <h2>
                We'll walk you through a few steps to update your group's
                information
              </h2>
            </div>
            <div className="group__edit__section">
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
            <div className="group__edit__section">
              <h2>What will your group's name be?</h2>
              <p>
                Choose a name that will give people a clear idea of what the
                group is about. Feel free to get creative! You can edit this
                later if you change your mind.
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
            <div className="group__edit__section">
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
              <textarea
                placeholder="Please write at least 30 characters"
                type="text"
                rows="10"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              {validationErrors.about && (
                <div className="error">{validationErrors.about}</div>
              )}
            </div>
            <div className="group__edit__section">
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
            <div className="group__edit__section">
              <button>Update Group</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditGroupPage;
