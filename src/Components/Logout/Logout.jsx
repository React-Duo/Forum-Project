import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import './Logout.css';

const Logout = () => {
    const { setLoginState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const logoutHandler = async () => {
            try {
                await signOutUser();
                setLoading(false);
                setLoginState(false);
                navigate('/');
            } catch (error) {
                setLoading(false);
                alert(error.message);
            }
        }
        logoutHandler();
    }, [])

    if (loading) {
        return (
            <div className='spinner'></div>
        )
    }

    return (
        <div className='centered'>
            You are logging out.
        </div>
    )

}

export default Logout;