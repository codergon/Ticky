import { useSelector } from "react-redux";

const Header = ({ current }) => {
  const darkThemeEnabled = useSelector(
    (state) => state.preferences.darkThemeEnabled
  );

  return (
    <>
      <div className="heady">
        <div className="heady_pre">
          <p
            style={{
              background: darkThemeEnabled && "#200fff",
              color: darkThemeEnabled ? "#fff" : "#200fff",
            }}
          >
            Playground<span>&nbsp;&nbsp;/&nbsp;</span>
          </p>
          <p
            style={{
              color: darkThemeEnabled ? "#ccc" : "#666",
            }}
          >
            {current}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
