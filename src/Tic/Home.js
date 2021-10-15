import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import "../styles/home.css";
import * as PasswordValidator from "password-validator";

function Homepage({ socket }) {
  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  const [isSet, setIsSet] = useState(false);

  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  const [roomfull, setroomfull] = useState(false);
  //activates joinRoom function defined on the backend

  let history = useHistory();

  const sendData = () => {
    var NameValidator = new PasswordValidator();
    NameValidator.is().min(4).is().max(8);

    if (NameValidator.validate(username) && NameValidator.validate(roomname)) {
      setIsSet(false);
      socket.emit("checkUser", {
        username: username,
        roomname: roomname,
        home: true,
      });
    } else {
      setIsSet(true);
    }
  };

  socket.on("entergame", () => {
    history.replace(`/ticky/${roomname}/${username}`);
  });

  socket.on("roomfull", () => {
    setroomfull(true);
  });

  return (
    <>
      <main
        className="main"
        style={{
          color: darkThemeEnabled ? "grey" : "#000",
          background: darkThemeEnabled ? "#18191A" : "transparent",
        }}
      >
        <div
          style={{
            top: 0,
            opacity: 0.08,
            width: "100vw",
            height: "100%",
            position: "absolute",
            background: `url(../img/${
              darkThemeEnabled ? "background2.svg" : "background.svg"
            })`,
          }}
        />

        <Header current={"Tic x Tac 🎈"} />

        <div className="create_tic">
          <div className="create_tic_inn">
            <div
              className="create_tic_hd"
              style={{
                color: darkThemeEnabled ? "#ccc" : "#222",
              }}
            >
              Your favorite Tic x Tac game.
            </div>

            {!!isSet && (
              <div className="create_tic_warn">
                Input valid name and username please <br /> Min of 4 characters
                and Max of 8
              </div>
            )}

            {!!roomfull && (
              <div className="create_tic_warn">Can't join this game!</div>
            )}

            <div
              className="create_tic_inp_cont"
              style={{
                color: darkThemeEnabled ? "#ccc" : "#555",
              }}
            >
              <div>
                <i className="uil uil-at"></i>
              </div>
              <input
                style={{
                  color: darkThemeEnabled ? "#ccc" : "#555",
                }}
                className="create_tic_inp"
                placeholder="Input your user name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div
              className="create_tic_inp_cont"
              style={{
                color: darkThemeEnabled ? "#ccc" : "#555",
              }}
            >
              <div>
                <i className="uil uil-map-marker-plus"></i>
              </div>
              <input
                style={{
                  color: darkThemeEnabled ? "#ccc" : "#555",
                }}
                className="create_tic_inp"
                placeholder="Input the room name"
                value={roomname}
                onChange={(e) => setroomname(e.target.value)}
              />
            </div>

            <button onClick={sendData}>Join Game 🎈</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Homepage;
