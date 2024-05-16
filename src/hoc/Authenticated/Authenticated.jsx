import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import "./Authenticated.css";
import PropTypes from 'prop-types';

/**
 * Renders the Authenticated higher-order component.
 *
 * @component
 * @param {ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {ReactNode} The rendered component.
 */
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

Authenticated.propTypes = {
  children: PropTypes.node.isRequired
}

export default Authenticated;
