import party from "party-js";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import arrayMatches from "../utils/arrayMatches";
import { useEffect, useMemo, useState } from "react";

const Tacky = ({ username, roomname, socket }) => {
  let history = useHistory();

  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  const [state, setstate] = useState({
    moves: [],
    data: [],
    fir: [],
    sec: [],
    play: true,
    fw: false,
    sw: false,
    clear: false,
    otherUser: null,
  });

  let copyState = state;

  useEffect(() => {
    if (!socket) return;
    socket.on("online", function () {
      console.log("Welcome Online");
    });
  }, [socket]);

  socket.on("roomfull", () => {
    history.replace(`/ticky/`);
  });

  const updateState = (newState) => {
    const copyStateNew = !newState.clear
      ? {
          ...copyState,
          ...newState,
          fir: !!(copyState.moves.length % 2)
            ? copyState.fir
            : [...copyState.fir, newState.moves.at(-1)],
          sec: !(copyState.moves.length % 2)
            ? copyState.sec
            : [...copyState.sec, newState.moves.at(-1)],
        }
      : {
          moves: [],
          data: [],
          fir: [],
          sec: [],
          play: true,
          fw: false,
          sw: false,
          clear: false,
          otherUser: newState.otherUser,
        };

    const check = arrayMatches(copyStateNew.fir, copyStateNew.sec);

    if (check == 1 && !newState.clear) {
      copyStateNew.fw = true;
      copyStateNew.sw = false;
    } else if (check == 2 && !newState.clear) {
      copyStateNew.sw = true;
      copyStateNew.fw = false;
    }

    copyState = copyStateNew;

    setstate(
      !newState.clear
        ? copyState
        : {
            moves: [],
            data: [],
            fir: [],
            sec: [],
            play: true,
            fw: false,
            sw: false,
            clear: false,
            otherUser: newState.otherUser,
          }
    );
  };

  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const addValue = (num) => {
    if (!copyState.play) return;
    if (copyState.fw || copyState.sw) return;

    if (!copyState.moves.includes(num)) {
      socket.emit("move", num);
      updateState({
        moves: [...state.moves, num],
        data: [...state.data, username],
        play: false,
        fw: false,
        sw: false,
        clear: false,
      });
    }
  };

  socket.on("move", (slug) => {
    updateState({
      moves: [...state.moves, slug.num],
      data: [...state.data, slug.user],
      play: true,
      fw: false,
      sw: false,
      clear: false,
    });
  });
  socket.on("clear", (isGone) => {
    updateState({
      moves: [],
      data: [],
      play: true,
      fw: false,
      sw: false,
      clear: true,
      otherUser: isGone.left ? null : copyState.otherUser,
    });
  });

  useEffect(() => {
    socket.emit("checkUser", {
      username: username,
      roomname: roomname,
      home: false,
    });
    socket.on("joined", (slug) => {
      socket.emit("meetother");
      updateState({
        moves: [],
        data: [],
        play: true,
        fw: false,
        sw: false,
        clear: true,
        otherUser: slug.user,
      });
    });
    socket.on("joinedOther", (slug) => {
      updateState({
        moves: [],
        data: [],
        play: true,
        fw: false,
        sw: false,
        clear: true,
        otherUser: slug.user,
      });
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  return (
    <main
      className="main"
      style={{
        color: darkThemeEnabled ? "grey" : "#000",
        background: darkThemeEnabled ? "#18191A" : "transparent",
      }}
    >
      {/* Div for background pattern */}
      <div
        style={{
          top: 0,
          zIndex: 0,
          opacity: 0.08,
          width: "100vw",
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          background: `url(../..//img/${
            darkThemeEnabled ? "background2.svg" : "background.svg"
          })`,
        }}
      />

      <Header current={"Tic x Tac 🎈"} />

      <div className="tick_cont">
        <div className="tick_connected">
          <p
            style={{
              textTransform: "capitalize",
              color: darkThemeEnabled ? "#ccc" : "#666",
            }}
          >
            {username}
          </p>
          {!state.otherUser && (
            <div
              onClick={() => history.replace(`/ticky/oneended`)}
              style={{
                fontSize: "15px",
                cursor: "pointer",
                padding: "10px 0px",
                borderRadius: "5px",
                letterSpacing: "0.015rem",
                color: darkThemeEnabled ? "#ccc" : "#200fff",
              }}
            >
              Play alone
            </div>
          )}
          {state.otherUser && (
            <p
              style={{
                textTransform: "capitalize",
                color: darkThemeEnabled ? "#ccc" : "#666",
              }}
            >
              {state.otherUser}
            </p>
          )}
        </div>

        <div className="tick_box">
          {numArr.map((i) => {
            return (
              <div
                key={i}
                className={"box"}
                onClick={() => addValue(i)}
                style={{
                  color: darkThemeEnabled && "#eee",
                  background: darkThemeEnabled && "#242526",
                }}
              >
                {copyState.moves.indexOf(i) >= 0
                  ? !!(copyState.moves.indexOf(i) % 2)
                    ? "X"
                    : "O"
                  : null}
              </div>
            );
          })}
        </div>

        <div
          className="winMesTic"
          style={{
            color: darkThemeEnabled && "#eee",
          }}
        >
          {copyState.fw
            ? `${copyState.data[0]} wins`
            : copyState.sw && `${copyState.data[1]} wins`}
        </div>

        {copyState.moves.length > 0 && (
          <div
            onClick={() => {
              socket.emit("clear");
              updateState({
                clear: true,
              });
            }}
            className="clearTic"
            style={{
              background: darkThemeEnabled && "#200fff",
              color: darkThemeEnabled ? "#fff" : "#200fff",
            }}
          >
            Clear Canvas
          </div>
        )}
      </div>
    </main>
  );
};

export default Tacky;
