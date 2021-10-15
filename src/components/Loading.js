const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="main_logo" style={{ color: "#222" }}>
        <div className="main_logo_inn">
          <div className="logo_border"></div>
          <i className="uil uil-desert"></i>
        </div>
      </div>
    </div>
  );
};

export default Loading;
