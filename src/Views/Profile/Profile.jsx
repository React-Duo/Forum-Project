import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import { assets } from "../../assets/assets";
import { getUsers, editCredential } from "../../service/request-service";
import AuthContext from "../../Context/AuthContext.jsx";
import {
  MIN_CHAR_LENGTH,
  MAX_CHAR_LENGTH,
  EMAIL_REGEX,
  DIGIT_REGEX,
  LETTER_REGEX,
  ALPHA_NUMERIC_REGEX,
  SPECIAL_CHARS_REGEX,
} from "../../common/constants.js";
import { uploadFile, getFile } from "../../service/storage.js";

const Profile = () => {
  const { isLoggedIn, setLoginState } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    photo: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [logo, setLogo] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      let users = await getUsers();
      users = Object.entries(users);
      if (isLoggedIn.status) {
        const currentUsername = users.filter(
          (user) => user[1].emailAddress === isLoggedIn.user
        )[0][1];
        setUser(currentUsername);

        setUserDetails({
          firstName: currentUsername.firstName,
          lastName: currentUsername.lastName,
          password: currentUsername.password,
          photo: currentUsername.photo,
        });
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (name, value) => {
    switch (name) {
      case "lastName":
      case "firstName":
        if (
          value.length < MIN_CHAR_LENGTH ||
          value.length > MAX_CHAR_LENGTH ||
          DIGIT_REGEX.test(value) ||
          SPECIAL_CHARS_REGEX.test(value)
        ) {
          setError(
            `First name must not contain special characters or digits and must be between ${MIN_CHAR_LENGTH} and ${MAX_CHAR_LENGTH} characters long.`
          );
          setSuccess(null);
          return;
        }
        break;
      case "password":
        if (
          value.length < 8 ||
          !SPECIAL_CHARS_REGEX.test(value) ||
          !DIGIT_REGEX.test(value) ||
          !LETTER_REGEX.test(value)
        ) {
          setError(
            `Password must be at least:8 characters, ONE digit, ONE letter, ONE special symbol`
          );
          setSuccess(null);
          return;
        }
        break;
    }

    // Update the userDetails state
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    editCredential(user.username, name, value);
    setSuccess("Success");
    setError(null);
  };

  const logoUpdate = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setLogo(file);
  };

  const fetchPhoto = async () => {
    console.log(user.username, logo.name);
    // const url = await getFile(user.username, logo.name);
    // console.log(url);
  };
  fetchPhoto();

  return (
    <div className="profileContainer">
      <div className="profileOptions">
        <div className="optionRow" id="imgSection">
          <div id="profileImage">
            <img src={user?.photo}></img>
          </div>
          <form id="changePhotoForm">
            <label className="custum-file-upload" htmlFor="file">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                >
                  <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill=""
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </g>
                </svg>
              </div>
              <input
                onChange={(e) => logoUpdate(e)}
                type="file"
                id="file"
              ></input>
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                uploadFile(user.username, logo, logo.name)
                  .then(() => {
                    console.log("File uploaded successfully");
                  })
                  .catch((error) => {
                    console.error("Error uploading file:", error);
                  });
              }}
            >
              Change photo
            </button>
          </form>
        </div>
        {error && <div className="confirmMessage">{error}</div>} <br />
        {success && <div className="confirmMessage">{success}</div>} <br />
        <div className="optionRow" id="fNameSection">
          <h2>First Name</h2>
          <input
            onChange={(e) => (userDetails.firstName = e.target.value)}
            placeholder={user?.firstName}
            type="text"
          ></input>
          <button
            onClick={() =>
              handleInputChange("firstName", userDetails.firstName)
            }
          >
            Edit
          </button>
        </div>
        <div className="optionRow" id="lNameSection">
          <h2>Last Name</h2>
          <input
            onChange={(e) => (userDetails.lastName = e.target.value)}
            type="text"
            placeholder={user?.lastName}
          ></input>
          <button
            onClick={() => handleInputChange("lastName", userDetails.lastName)}
          >
            Edit
          </button>
        </div>
        <div className="optionRow" id="passwordSection">
          <h2>Password</h2>
          <input
            onChange={(e) => (userDetails.password = e.target.value)}
            type="text"
            placeholder={user?.password}
          ></input>
          <button
            onClick={() => handleInputChange("password", userDetails.password)}
          >
            Edit
          </button>
        </div>
        <div className="optionRow" id="usernameSection">
          <h2>Username</h2>
          <input defaultValue={user?.username} type="text"></input>
        </div>
        <div className="optionRow" id="emailSection">
          <h2>Email</h2>
          <input defaultValue={user?.emailAddress} type="text"></input>
        </div>
      </div>
    </div>
  );
};

export default Profile;
