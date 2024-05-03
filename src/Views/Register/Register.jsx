import { useState } from 'react';
import { checkIfUserExists } from '../../service/request-service.js';
import { registerUser } from '../../service/authentication-service.js';
import './Register.css';

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


    const register = async () => {
        const formData = getFormData();
        console.log(formData);

        const snapshot = await checkIfUserExists(formData.username);
        
        if (snapshot.exists()) {
            setUserExists(true);
            return;
        }

        registerUser(formData.emailAddress, formData.password);


        


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
        <div className="register-form">
            <span><label htmlFor="first-name">First Name </label><input type="text" name="first-name" id='first-name'/></span> <br />
            <span><label htmlFor="last-name">Last Name </label><input type="text" name="last-name" id='last-name'/></span> <br />
            <span><label htmlFor="email">Email address </label><input type="email" name="email" id='email'/></span> <br />
            <span><label htmlFor="username">Username </label><input type="text" name="username" id='username'/></span> <br />
            <span><label htmlFor="password">Password </label><input type="password" name="password" id='password'/></span> <br />
            <button onClick={register}>Register</button>
        </div>
    )

}

export default Register;