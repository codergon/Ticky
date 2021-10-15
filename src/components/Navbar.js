import { Mode } from "../constants";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  return (
    <>
      <nav
        style={{
          background: darkThemeEnabled ? "#242526" : "transparent",
          borderColor: darkThemeEnabled ? "#333" : "#ccc",
          color: darkThemeEnabled ? "#fff" : "#000",
        }}
      >
        <div
          className="logo"
          style={{
            fontVariationSettings: darkThemeEnabled
              ? '"wght" 450'
              : '"wght" 550',
          }}
        >
          thealphaknight
        </div>

        <div
          className="nav_rt nav_rt1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (!darkThemeEnabled) {
              dispatch({ type: Mode.DARK });
            } else {
              dispatch({ type: Mode.LIGHT });
            }
          }}
        >
          mode&nbsp;
          <i className={darkThemeEnabled ? "uil uil-sun" : "uil uil-moon"}></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
