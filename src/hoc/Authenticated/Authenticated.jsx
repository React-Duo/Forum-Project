import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import './Authenticated.css';

const Authenticated = ({ children }) => {

    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            {isLoggedIn ? children : (
                <div className='authenticated-hoc'>
                    <h2>You need to be logged in to access this content.</h2>
                </div>
            )}
        </div>
    )
};

export default Authenticated;