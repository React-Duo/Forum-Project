import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserExists, createUser } from '../../service/request-service.js';
import { registerUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import './Register.css';
import { MIN_CHAR_LENGTH, MAX_CHAR_LENGTH, EMAIL_REGEX, DIGIT_REGEX, LETTER_REGEX, ALPHA_NUMERIC_REGEX, SPECIAL_CHARS_REGEX } from '../../common/constants.js';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isRegSuccessful, setIsRegSuccessful] = useState(false);
    const [count, setCount] = useState(7);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        username: '',
        password: ''
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const { setLoginState } = useContext(AuthContext);

    useEffect(() => {
        if (isFormSubmitted) {
            const registrationHandler = async () => {
                try {
                    setLoading(true);
                    const snapshot = await checkIfUserExists(form.username);
                    if (snapshot.exists()) {
                        setLoading(false);
                        setError(`User already exists.`);
                        return;
                    }

                    const userCredentials = await registerUser(form.emailAddress, form.password);
                    if (typeof userCredentials === 'string' && userCredentials.includes('auth/email-already-in-use')) {
                        throw new Error(`${form.emailAddress} email address is already in use.`);
                    }

                    const creationStatus = await createUser({
                        firstName: form.firstName, 
                        lastName: form.lastName, 
                        emailAddress: form.emailAddress, 
                        username: form.username, 
                        password: form.password,
                        role: 'author',
                    });

                    if (!creationStatus) {
                        setLoading(false);
                        setIsRegSuccessful(true);
                    }

                } catch (error) {
                    setLoading(false);
                    setError(error.message);
                }
            }
            registrationHandler();
        }
    }, [form]);

    useEffect(() => {
        if (isRegSuccessful) {
            if (count === 0) {
                setLoginState({status: true, user: form.emailAddress});
                navigate('/');
            }
            else setTimeout(() => setCount(count - 1), 1000);
        }
    }, [count, isRegSuccessful]);

    const register = (event) => {
        event.preventDefault();        
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const emailAddress = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;

        if (firstName.length < MIN_CHAR_LENGTH || firstName.length > MAX_CHAR_LENGTH
            || DIGIT_REGEX.test(firstName) || SPECIAL_CHARS_REGEX.test(firstName)) {
            setError(`First name must not contain special characters or digits and must be between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters long.`);
            return;
        }

        if (lastName.length < MIN_CHAR_LENGTH || lastName.length > MAX_CHAR_LENGTH
            || DIGIT_REGEX.test(lastName) || SPECIAL_CHARS_REGEX.test(lastName)) {
            setError(`Last name must not contain special characters or digits and must be between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters long.`); 
            return;
        }

        if (!EMAIL_REGEX.test(emailAddress)) {
            setError(`${emailAddress} is not a valid email address.`);
            return;
        }

        if (username.length < 8 || !ALPHA_NUMERIC_REGEX.test(username) 
            || !DIGIT_REGEX.test(username) || !LETTER_REGEX.test(username)) {
                setError(`${username} is not a valid username.`);
                return;
        }

        if (password.length < 8 || !SPECIAL_CHARS_REGEX.test(password) 
            || !DIGIT_REGEX.test(password) || !LETTER_REGEX.test(password) ) {
                setError(`${password} is not a valid password.`);
                return;
        }

        setForm({ firstName, lastName, emailAddress, username, password });
        setIsFormSubmitted(true);
    }

    if (loading) {
        return (
            <div className='spinner'></div>
        )
    }

    if (isRegSuccessful) {
        return (
            <div className="registration-success">
                <p>Welcome onboard!</p> <br />
                <p>You have registered successfully!</p> <br /> <br />
                <p>You will be redirected to Home page in {count} seconds...</p>
            </div>
        )
    }

    return (
        <form onSubmit={register} className="register-form">
            {error && <div>{error}</div>} <br />
            <span><label htmlFor="firstName">First Name </label><input type="text" name="firstName" id='firstName' required /></span> <br />
            <h5><i>/ First name must be between 4 and 32 characters long. /</i></h5> <br />
            <span><label htmlFor="lastName">Last Name </label><input type="text" name="lastName" id='lastName' required /></span> <br />
            <h5><i>/ Last name must be between 4 and 32 characters long. /</i></h5> <br />
            <span><label htmlFor="email">Email address </label><input type="email" name="email" id='email' required /></span> <br />
            <span><label htmlFor="username">Username </label><input type="text" name="username" id='username' required /></span> <br />
            <h5><i>/ Username requirements - at least: 8 characters, ONE digit, ONE letter, NO special symbols /</i></h5> <br />
            <span><label htmlFor="password">Password </label><input type="password" name="password" id='password' required /></span> <br />
            <h5><i>/ Password requirements - at least: 8 characters, ONE digit, ONE letter, ONE special symbol /</i></h5> <br />
            <button type="submit">Register</button>
        </form>
    )

}

export default Register;