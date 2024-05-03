const Register = () => {







    return (
        <div className="register-form">
            <label htmlFor="first-name"></label>First Name <input type="text" name="first-name" /> <br />
            <label htmlFor="last-name">Last Name </label><input type="text" name="last-name" /> <br />
            <label htmlFor="email">Email address </label><input type="email" name="email" /> <br />
            <label htmlFor="username">Username </label><input type="text" name="username"/> <br />
            <label htmlFor="password">Password </label><input type="password" name="password"/>
        </div>
    )

}

export default Register;