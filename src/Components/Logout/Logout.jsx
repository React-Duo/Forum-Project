import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import './Logout.css';

const Logout = () => {
    const { setLoginState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const logoutHandler = async () => {
            try {
                await signOutUser();
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        logoutHandler();
    }, []);

    useEffect(() => {
        if (count === 0) {
            setLoginState({status: false, user: ''});
            navigate('/');
        }
        else setTimeout(() => setCount(count - 1), 1000);
    }, [count]);

    if (loading) {
        return (
            <div className="spinner"></div>
        )
    }

    return (
        <div className="logout-success">
            <p>You have logged out successfully.</p> <br />
            <p>You will be redirected to Home page in {count} seconds...</p>
        </div>
    )
}

export default Logout;