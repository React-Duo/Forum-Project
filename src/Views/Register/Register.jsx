import { useState } from 'react';
import { checkIfUserExists, createUser } from '../../service/request-service.js';
import { registerUser } from '../../service/authentication-service.js';
import './Register.css';

const MIN_CHAR_LENGTH = 4;
const MAX_CHAR_LENGTH = 32;

const Register = () => {
    const [userExists, setUserExists] = useState(false);

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

        const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
        if (!emailValidationRegex.test(formData.emailAddress)) {
            alert(`${formData.emailAddress} is not a valid email address.`);
            return;
        }



        const snapshot = await checkIfUserExists(formData.username);

        if (snapshot.exists()) {
            setUserExists(true);
            return;
        }

        await registerUser(formData.emailAddress, formData.password);

        createUser(formData);

        


    }

    if (userExists) {
        return (
            <div className="registration-fail">
                <p>User already exists!</p>
                <button onClick={() => setUserExists(false)}>Back</button>
            </div>
        )
    }

    return (
        <form onSubmit={register} className="register-form">
            <span><label htmlFor="first-name">First Name </label><input type="text" name="first-name" id='first-name' required /></span> <br />
            <span><label htmlFor="last-name">Last Name </label><input type="text" name="last-name" id='last-name' required /></span> <br />
            <span><label htmlFor="email">Email address </label><input type="email" name="email" id='email' required /></span> <br />
            <span><label htmlFor="username">Username </label><input type="text" name="username" id='username'/></span> <br />
            <span><label htmlFor="password">Password </label><input type="password" name="password" id='password' required /></span> <br />
            <button type="submit">Register</button>
        </form>
    )

}

export default Register;