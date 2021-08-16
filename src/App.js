import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import MoviesList from "./components/moviesList";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/narbar";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route exact path="/movies" component={MoviesList}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
