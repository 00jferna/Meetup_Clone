import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div className="page__not__found__cont">
        <Link to="/">
          <i className="fas fa-exclamation-triangle fa-lg"></i>
          <h3>Page Not Found</h3>
          <p>Return Home</p>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
