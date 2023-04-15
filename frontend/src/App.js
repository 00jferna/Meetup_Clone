import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import GroupPage from "./components/GroupsPage";
import EventPage from "./components/EventsPage";
import NewGroupPage from "./components/NewGroupPage";
import GroupDetails from "./components/GroupDetails";
import EventDetails from "./components/EventDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route path="/groups/new" component={NewGroupPage} />
          <Route path="/groups/:groupId" component={GroupDetails} />
          <Route path="/groups" component={GroupPage} />

          <Route path="/events/:eventId" component={EventDetails} />
          <Route path="/events" component={EventPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
