import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import "./Authenticated.css";

const Authenticated = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn.status) return children;
  else
    return (
      <div className="auth-msg">
        <div className="authenticated-hoc">
          <h3>You need to be logged in to access this content.</h3>
        </div>
      </div>
    );
};

export default Authenticated;
