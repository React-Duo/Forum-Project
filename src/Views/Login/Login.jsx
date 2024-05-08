import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import { EMAIL_REGEX } from '../../common/constants.js';
import './Login.css';

const Login = () => {
    const { setLoginState } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [count, setCount] = useState(5);
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
                    setIsLoginSuccessful(true);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
            loginHandler();
        }
    }, [form]);

    useEffect(() => {
        if (isLoginSuccessful) {
            if (count === 0) {
                setLoginState({status: true, user: form.username});
                navigate('/');
            }
            else setTimeout(() => setCount(count - 1), 1000);
        }
    }, [count, isLoginSuccessful]);

    const loginUser = (event) => {        
        event.preventDefault();
        const emailAddress = event.target.email.value;
        const password = event.target.password.value;
        if (!EMAIL_REGEX.test(emailAddress)) {
            setError(`${emailAddress} is not a valid email address.`);
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

    if (isLoginSuccessful) {
        return (
            <div className="login-success">
                <p>You have logged in successfully!</p> <br /> <br />
                <p>You will be redirected to Home page in {count} seconds...</p>
            </div>
        )
    }

    return (
        <form onSubmit={loginUser} className="login-form">
            {error && <div>{error}</div>} <br />
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