import React from "react";
import Tacky from "./Tic/Tacky";
import OneEnded from "./Tic/OneEnded";
import stores from "./store/stores";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PlayGame from "./components/PlayGame";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import io from "socket.io-client";
import Homepage from "./Tic/Home";
let socket = io("https://react-ticky.herokuapp.com/");
// let socket = io("http://localhost:5000");

// Query Client to fetch data

function Tictac(props) {
  return (
    <Tacky
      username={props.match.params.username}
      roomname={props.match.params.roomname}
      socket={socket}
    />
  );
}

export default function App() {
  return (
    <ReduxProvider store={stores}>
      <Router>
        <Navbar />

        <Route path="/" exact component={PlayGame} />

        <Route path="/ticky/" exact>
          <Homepage socket={socket} />
        </Route>

        <Route path="/ticky/oneended" exact>
          <OneEnded />
        </Route>

        <Route path="/ticky/:roomname/:username" component={Tictac} />

        <Footer />
      </Router>
    </ReduxProvider>
  );
}
