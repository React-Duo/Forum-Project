import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import { EMAIL_REGEX } from '../../common/constants.js';
import './Login.css';

const Login = () => {
    const { setLoginState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [form, setForm] = useState({
        emailAddress: '', 
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (isFormSubmitted) {
            const loginHandler = async () => {
                try {
                    setLoading(true);
                    const userCredentials = await signInUser(form.emailAddress, form.password);
                    if (typeof userCredentials === 'string' && userCredentials.includes('auth/invalid-credential')) {
                       throw new Error(`Incorrect login credentials.`);
                    } 
                    setLoading(false);
                    setLoginState(true);
                    navigate("/");
                } catch (error) {
                    setLoading(false);
                    alert(error.message);
                }
            }
            loginHandler();
        }
    }, [form]);

    const loginUser = (event) => {        
        event.preventDefault();
        const emailAddress = event.target.email.value;
        const password = event.target.password.value;
        if (!EMAIL_REGEX.test(emailAddress)) {
            alert(`${emailAddress} is not a valid email address.`);
            return;
        }
        setForm({ emailAddress, password });
        setIsFormSubmitted(true);
    }

    if (loading) {
        return (
            <div className='spinner'></div>
        )
    }

    return (
        <form onSubmit={loginUser} className="login-form">
            <span><label htmlFor="email">Email address </label>
            <input type="email" name="email" id="email" required /></span> 
            <br />
            <span><label htmlFor="password">Password </label>
            <input type="password" name="password" id='password' required /></span>
            <br />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;