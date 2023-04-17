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
import NewEventPage from "./components/NewEventPage";
import EditGroupPage from "./components/EditGroupPage";
import PageNotFound from "./components/PageNotFound";

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
          <Route path="/groups/:groupId/edit" component={EditGroupPage} />
          <Route path="/groups/:groupId/events/new" component={NewEventPage} />
          <Route path="/groups/:groupId" component={GroupDetails} />
          <Route path="/groups" component={GroupPage} />

          <Route path="/events/:eventId" component={EventDetails} />
          <Route path="/events" component={EventPage} />
          <Route path="/" component={PageNotFound} />
        </Switch>
      )}
    </>
  );
}

export default App;
