import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Checkout from "./Checkout";
import { auth } from "./Firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  // Piece of code which runs based on a given condition
  // this is what we call a USEEFFECT HOOK <<<<<<<<<<<<
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // the user is logged in...
        dispatch({
          type: "SET_USER",
          user: authUser
        });
      } else {
        // the user is logged out...
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
    return () => {
      // Any cleanup operations go in here...
      unsubscribe();
    };
  }, []);
  console.log("USER IS >>>>", user);

  // it will run once the App components loads and then every time the basket changes [basket]
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
