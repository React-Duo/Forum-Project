import { useEffect, useState } from 'react';
import './Users.css';
import { searchUser } from '../../service/request-service';

const Users = () => {
    const [searchParams, setSearchParams] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUserSearch = async () => {


        await searchUser(searchParams.searchString, searchParams.searchTerm);

    };

    useEffect(() => {if (searchParams) handleUserSearch()}, [searchParams]);

    const handleSearchForm = (event) => {
        event.preventDefault();
        const searchString = event.target.searchField.value;
        const searchTerm = event.target.searchType.value;
        setSearchParams({ searchString, searchTerm });
    }

    if (loading) {
        return <div className="spinner"></div>
    }

    return (
        <div>
            <form onSubmit={handleSearchForm} className="search-form">
                <input type="text" id="searchField" name="searchField" required/> <br />
                <span>
                    <input type="radio" value="firstName" id="firstName" name="searchType" required /> 
                    <label htmlFor="firstName">First Name</label>
                    <input type="radio" value="lastName" id="lastName" name="searchType" required /> 
                    <label htmlFor="lastName">Last Name</label>
                    <input type="radio" value="emailAddress" id="emailAddress" name="searchType" required /> 
                    <label htmlFor="emailAddress">Email Address</label>
                    <input type="radio" value="username" id="username" name="searchType" required /> 
                    <label htmlFor="username">Username</label>
                </span><br />
                <button type="submit">Search</button>
            </form>



        </div>
    )
}

export default Users;