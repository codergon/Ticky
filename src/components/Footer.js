import "../styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="ft_inn">
        <div className="ft_r1">
          <div className="ft_cap">
            <p>You only live once!!</p>
            <p>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-github"></i>
            </p>
          </div>
        </div>
        <div className="ft_r2"></div>
        <div className="ft_r3">
          <p>&copy;2021</p>
          <a href="#code">thealphaknight</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
