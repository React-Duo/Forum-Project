import './Register.css'

const Register = () => {







    return (
        <div className="register-form">
            <span><label htmlFor="first-name">First Name </label><input type="text" name="first-name" /></span> <br />
            <span><label htmlFor="last-name">Last Name </label><input type="text" name="last-name" /></span> <br />
            <span><label htmlFor="email">Email address </label><input type="email" name="email" /></span> <br />
            <span><label htmlFor="username">Username </label><input type="text" name="username"/></span> <br />
            <span><label htmlFor="password">Password </label><input type="password" name="password"/></span>
        </div>
    )

}

export default Register;