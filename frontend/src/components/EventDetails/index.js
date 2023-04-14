import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import * as groupActions from "../../store/groups";
import "./EventDetails.css";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventInt = Number.parseInt(eventId);
  const event = useSelector((state) => state.event.eventDetails);
  const group = useSelector((state) => state.group.groupDetails);
  const defaultImage = "../assets/group-cover-3-wide.webp";
  const [loaded, setLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    dispatch(eventActions.getEventDetails(eventInt)).then(() =>
      setLoaded(true)
    );
  }, [dispatch]);

  useEffect(() => {
    if (loaded && event.Group)
      dispatch(groupActions.getGroupDetails(event.Group.id)).then(() =>
        setPageLoaded(true)
      );
  }, [loaded]);

  return (
    <>
      {pageLoaded && (
        <div className="event__details__page">
          <div className="event__details__header">
            <a href="/events">Events</a>
            <h2>{event.name}</h2>
            <h3>
              Hosted by {group.Organizer.firstName} {group.Organizer.lastName}
            </h3>
          </div>
          <div className="event__details__cont">
            <div className="event__details__imagecont">
              <img
                className="event__details__image"
                src={
                  event.EventImages.length ? event.EventImages[0] : defaultImage
                }
              ></img>
              <div className="event__group">
                <div className="event__group__cont">
                  <img
                    className="event__group__image"
                    src={group.GroupImages ? "yes" : defaultImage}
                  ></img>
                  <div className="event__group__details">
                    <h3>{event.Group.name}</h3>
                    <h4>{group.private ? "Private" : "Public"}</h4>
                  </div>
                </div>
                <div className="event__details">
                  <ul>
                    <li className="event__details__time">
                      <i className="fa fa-clock"></i>
                      <ul>
                        <ul className="event__details__time">
                          <li>START</li>
                          <li>{new Date(event.startDate).toDateString()}</li>
                          <li>{new Date(event.startDate).toTimeString()}</li>
                        </ul>
                        <ul className="event__details__time">
                          <li>END</li>
                          <li>{new Date(event.endDate).toDateString()}</li>
                          <li>{new Date(event.endDate).toTimeString()}</li>
                        </ul>
                      </ul>
                    </li>
                    <ul className="event__details__price__location">
                      <li>
                        <i className="fa fa-dollar-sign"></i>
                      </li>
                      <li>{event.price}</li>
                    </ul>
                    <ul className="event__details__price__location">
                      <li>
                        <i className="fa fa-map-pin"></i>
                      </li>
                      <li>{event.type}</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2>Details</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Proin fermentum leo vel orci porta. Sociis natoque penatibus et
                magnis dis parturient montes nascetur ridiculus. Nisl nunc mi
                ipsum faucibus. Turpis egestas maecenas pharetra convallis
                posuere morbi. Ut ornare lectus sit amet. Augue lacus viverra
                vitae congue eu consequat. Bibendum arcu vitae elementum
                curabitur vitae nunc sed velit. Purus gravida quis blandit
                turpis cursus in hac. Aliquam purus sit amet luctus venenatis
                lectus magna fringilla urna. Proin nibh nisl condimentum id
                venenatis a condimentum. Ut porttitor leo a diam sollicitudin
                tempor id. Lacus laoreet non curabitur gravida arcu ac tortor.
                Cursus turpis massa tincidunt dui ut ornare lectus sit. Maecenas
                pharetra convallis posuere morbi leo urna. Dolor sit amet
                consectetur adipiscing elit. Aliquet porttitor lacus luctus
                accumsan tortor posuere ac ut. Proin nibh nisl condimentum id.
                Aliquet risus feugiat in ante metus dictum at. Ut ornare lectus
                sit amet. Turpis egestas integer eget aliquet nibh praesent
                tristique magna sit. Enim tortor at auctor urna nunc.
                Scelerisque varius morbi enim nunc faucibus a pellentesque sit.
                Egestas sed sed risus pretium quam vulputate. Elit pellentesque
                habitant morbi tristique senectus. A pellentesque sit amet
                porttitor eget dolor morbi. Integer vitae justo eget magna
                fermentum iaculis. Donec pretium vulputate sapien nec sagittis
                aliquam malesuada bibendum. Commodo nulla facilisi nullam
                vehicula ipsum a. Eget nullam non nisi est sit. Massa massa
                ultricies mi quis hendrerit. Est placerat in egestas erat
                imperdiet. Turpis cursus in hac habitasse. Cursus turpis massa
                tincidunt dui ut ornare lectus sit amet. Quis lectus nulla at
                volutpat diam ut venenatis.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
