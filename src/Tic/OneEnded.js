import party from "party-js";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import arrayMatches from "../utils/arrayMatchesSingle";

const OneEnded = () => {
  let history = useHistory();

  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  const [fir, setfir] = useState([]);
  const [sec, setsec] = useState([]);
  const [fw, setfw] = useState(false);
  const [sw, setsw] = useState(false);
  const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Update first and second player arrays
  const addValue = (num) => {
    // If there is a winner return
    if (fw || sw) return;

    if (fir.length <= sec.length && !fir.includes(num) && !sec.includes(num)) {
      setfir((prev) => [...prev, num]);
    } else if (
      fir.length > sec.length &&
      !fir.includes(num) &&
      !sec.includes(num)
    ) {
      setsec((prev) => [...prev, num]);
    }
  };

  const checkForWinner = (fir, sec) => {
    if (arrayMatches(fir)) {
      setfw(true);
      party.confetti(document.getElementsByClassName("box")[fir.at(-1) - 1], {
        count: party.variation.range(20, 40),
      });
    } else if (arrayMatches(sec)) {
      setsw(true);
      party.confetti(document.getElementsByClassName("box")[sec.at(-1) - 1], {
        count: party.variation.range(20, 40),
      });
    }
  };

  // The function above is expensive as it runs "arrayMatches" twice
  // such a function shouldn't run on every rerender or when theme changes
  useMemo(() => checkForWinner(fir, sec), [fir, sec]);

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
          background: `url(../../img/${
            darkThemeEnabled ? "background2.svg" : "background.svg"
          })`,
        }}
      />

      <Header current={"Tic x Tac 🎈"} />

      <div className="tick_cont">
        <div className="tick_connected" style={{ justifyContent: "center" }}>
          <div
            onClick={() => history.replace(`/ticky/`)}
            style={{
              fontSize: "15px",
              cursor: "pointer",
              padding: "10px 0px",
              borderRadius: "5px",
              letterSpacing: "0.015rem",
              color: darkThemeEnabled ? "#ccc" : "#200fff",
            }}
          >
            Play with someone
          </div>
        </div>

        <div className="tick_box">
          {numArr.map((i) => {
            return (
              <div
                className={"box"}
                onClick={() => addValue(i)}
                style={{
                  color:
                    (fw && fir.includes(i)) || (sw && sec.includes(i))
                      ? "blue"
                      : darkThemeEnabled && "#eee",
                  background: darkThemeEnabled && "#242526",
                }}
              >
                {fir.includes(i) ? "X" : sec.includes(i) && "O"}
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
          {fw ? "First Player wins" : sw && "Second Player wins"}
        </div>

        {(fir.length > 0 || sec.length > 0) && (
          <div
            onClick={() => {
              setfw(false);
              setsw(false);
              setfir([]);
              setsec([]);
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

export default OneEnded;
