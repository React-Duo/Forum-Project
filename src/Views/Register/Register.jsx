import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserExists, createUser } from '../../service/request-service.js';
import { registerUser } from '../../service/authentication-service.js';
import AuthContext from '../../Context/AuthContext.jsx';
import './Register.css';

const MIN_CHAR_LENGTH = 4;
const MAX_CHAR_LENGTH = 32;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const DIGIT_REGEX = /\d/;
const LETTER_REGEX = /[a-zA-Z]/;
const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/;
const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const Register = () => {

    const [userExists, setUserExists] = useState(false);
    const [isRegSuccessful, setIsRegSuccessful] = useState(false);
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const { setLoginState } = useContext(AuthContext);

    const getFormData = () => {
        const firstName = document.querySelector('#first-name').value;
        const lastName = document.querySelector('#last-name').value;
        const emailAddress = document.querySelector('#email').value;
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        return { firstName, lastName, emailAddress, username, password }
    }

    const register = async (event) => {
        event.preventDefault();

        const formData = getFormData();

        if (formData.firstName.length < MIN_CHAR_LENGTH || formData.firstName.length > MAX_CHAR_LENGTH) {
            alert(`First name must be between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters long.`); 
            return;
        }

        if (formData.lastName.length < MIN_CHAR_LENGTH || formData.lastName.length > MAX_CHAR_LENGTH) {
            alert(`Last name must be between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters long.`); 
            return;
        }

        if (!EMAIL_REGEX.test(formData.emailAddress)) {
            alert(`${formData.emailAddress} is not a valid email address.`);
            return;
        }

        if (formData.username.length < 8 || !ALPHA_NUMERIC_REGEX.test(formData.username) 
            || !DIGIT_REGEX.test(formData.username) || !LETTER_REGEX.test(formData.username)) {
                alert(`${formData.username} is not a valid username.`);
                return;
        }

        if (formData.password.length < 8 || !SPECIAL_CHARS_REGEX.test(formData.password) 
            || !DIGIT_REGEX.test(formData.password) || !LETTER_REGEX.test(formData.password) ) {
                alert(`${formData.password} is not a valid password.`);
                return;
        }

        const snapshot = await checkIfUserExists(formData.username);
        if (snapshot.exists()) {
            setUserExists(true);
            return;
        }

        const userCredentials = await registerUser(formData.emailAddress, formData.password);
        if (typeof userCredentials === 'string' && userCredentials.includes('auth/email-already-in-use')) {
            alert(`${formData.emailAddress} email address is already in use.`);
            return;
        }

        const creationStatus = await createUser(formData);
        if (!creationStatus) {
            setIsRegSuccessful(true);
        }
    }

    const countDown = () => {
        if (count === 0) {
            setLoginState(true);
            navigate('/');
        }
        else setTimeout(() => setCount(count - 1), 1000);
    }
    
    if (userExists) {
        return (
            <div className="registration-fail">
                <p>User already exists!</p>
                <button onClick={() => setUserExists(false)}>Back</button>
            </div>
        )
    }

    if (isRegSuccessful) {
        return (
            <div className="registration-success">
                <p>Welcome onboard!</p> <br />
                <p>You have registered successfully!</p> <br /> <br />
                <p>You will be redirected to Home page in {count} seconds...
                {countDown()}
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={register} className="register-form">
            <span><label htmlFor="first-name">First Name </label><input type="text" name="first-name" id='first-name' required /></span> <br />
            <h5><i>/ First name must be between 4 and 32 characters long. /</i></h5> <br />
            <span><label htmlFor="last-name">Last Name </label><input type="text" name="last-name" id='last-name' required /></span> <br />
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