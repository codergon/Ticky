import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const PlayGame = () => {
  let history = useHistory();
  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        background: darkThemeEnabled ? "#18191A" : "transparent",
      }}
    >
      <div
        style={{
          top: 0,
          zIndex: 0,
          opacity: 0.08,
          width: "100vw",
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          background: `url(../img/${
            darkThemeEnabled ? "background2.svg" : "background.svg"
          })`,
        }}
      />

      <div
        onClick={() => history.push(`/ticky/oneended`)}
        className="clearTic"
        style={{
          color: "#fff",
          fontSize: "15px",
          cursor: "pointer",
          marginTop: "20px",
          borderRadius: "5px",
          padding: "10px 20px",
          background: "#200fff",
          letterSpacing: "0.015rem",
        }}
      >
        Play alone
      </div>
      <div
        onClick={() => history.push(`/ticky/`)}
        className="clearTic"
        style={{
          color: "#fff",
          fontSize: "15px",
          cursor: "pointer",
          borderRadius: "5px",
          padding: "10px 20px",
          background: "#200fff",
          letterSpacing: "0.015rem",
        }}
      >
        Play with someone
      </div>
    </div>
  );
};

export default PlayGame;
