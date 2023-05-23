import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Food from "../Food/Food";
import FoodForm from "../Food/FoodForm";
import "./App.css";
import EditFood from "../Food/FoodEditForm";
import Occupation from "../Occupation/Occupation";
import OccupationForm from "../Occupation/OccupationForm";
import EditOccupation from "../Occupation/OccupationEditForm";
import SocialActivity from "../SocialActivity/SocialActivity";
import SocialForm from  '../SocialActivity/SocialActivityForm';
import EditSocial from '../SocialActivity/SocialActivityEditForm';
import Movement from "../Movement/Movement";
import MovementForm from "../Movement/MovementForm"
import "./App.css";
import Sleep from "../Sleep/Sleep";
import SleepForm from "../Sleep/SleepForm";
import EditSleep from "../Sleep/SleepEditForm";
import EditMovement from "../Movement/MovementEditForm";
import Work from "../Work/Work";
import WorkForm from "../Work/WorkForm";
import WorkEditForm from "../Work/WorkEditForm";
import DetailsPage from "../Details/Details";
import SnackbarProvider from "../SnackbarProvider/SnackbarProvider";


function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>
          <SnackbarProvider>
                        {/* Paths for Food */}
          <Route exact path="/food">
            {user.id ? <Food /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/foodform">
            {user.id ? <FoodForm /> : <Redirect to="/food" />}
          </Route>
          <Route exact path="/food/details/:id">
            {user.id ? <EditFood /> : <Redirect to="/food" />}
          </Route>
                        {/* Paths for Sleep */}
          <Route exact path="/sleep">
            {user.id ? <Sleep /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/sleepform">
            {user.id ? <SleepForm /> : <Redirect to="/sleep" />}
          </Route>
          <Route exact path="/sleep/details/:id">
            {user.id ? <EditSleep /> : <Redirect to="/sleep" />}
          </Route>
                {/* Paths for Movement */}
          <Route exact path="/movement">
            {user.id ? <Movement /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/movementform">
            {user.id ? <MovementForm /> : <Redirect to="/movement" />}
          </Route>
          <Route exact path="/movement/details/:id">
            {user.id ? <EditMovement /> : <Redirect to="/movement" />}
          </Route>
                {/* Paths for Social Activity */}
          <Route exact path="/social">
            {user.id ? <SocialActivity /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/socialform">
            {user.id ? <SocialForm /> : <Redirect to="/social" />}
          </Route>
          <Route exact path="/social/details/:id">
            {user.id ? <EditSocial /> : <Redirect to="/social" />}
          </Route>
              {/* Paths for Occupation */}
          <Route exact path="/occupation">
            {user.id ? <Occupation /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/occupationform">
            {user.id ? <OccupationForm /> : <Redirect to="/occupation" />}
          </Route>
          <Route exact path="/occupation/details/:id">
            {user.id ? <EditOccupation /> : <Redirect to="/occupation" />}
          </Route>
              {/* Paths for Work */}
          <Route exact path="/work">
            {user.id ? <Work /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/workform">
            {user.id ? <WorkForm /> : <Redirect to="/work" />}
          </Route>
          <Route exact path="/work/details/:id">
            {user.id ? <WorkEditForm /> : <Redirect to="/work" />}
          </Route>

          <Route exact path="/details">
            {user.id ? <DetailsPage/> : <Redirect to="/details" />}
          </Route>
          </SnackbarProvider>
          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
