import { useEffect, useState } from 'react';
import './Users.css';
import { editCredential, searchUser } from '../../service/request-service';

const Users = () => {
    const [searchParams, setSearchParams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);
    const [userToBlock, setUserToBlock] = useState(null);
    const [userToUnblock, setUserToUnblock] = useState(null);

    const handleUserSearch = async () => {
        setLoading(true);
        try {
            const data = await searchUser(searchParams.searchString, searchParams.searchTerm);
            if (data === "Data not found!") {
                throw new Error("No users matched the search criteria.");
            }
            setError(null);
            const filteredUsers = Object.entries(data).map(([key, user]) => user = {id: key, ...user});
            setUsers(filteredUsers);
        } catch (error) {
            setUsers(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {if (searchParams) handleUserSearch()}, [searchParams, userToBlock, userToUnblock]);

    useEffect(() => {
        const blockUser = async () => {
            try {
                setLoading(true);
                await editCredential(userToBlock.id, "isBlocked", true);
            } catch (error) {
                setError(error.message);
            } finally {
                setUserToBlock(null);
                setLoading(false);
            }
        }
        if (userToBlock) blockUser();
    }, [userToBlock]);

    useEffect(() => {
        const unblockUser = async () => {
            try {
                setLoading(true);
                await editCredential(userToUnblock.id, "isBlocked", false);
            } catch (error) {
                setError(error.message);
            } finally {
                setUserToUnblock(null);
                setLoading(false);
            }
        }
        if (userToUnblock) unblockUser();
    }, [userToUnblock]);

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
                <input type="text" id="searchField" name="searchField" placeholder="Search users..." required/> <br />
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
            {error && <div id="error">{error}</div>}
            {users && 
                <div className="users-list">
                    {users.map(user => {
                        console.log(user);
                        return <div className="user-details" key={user.id}>
                                    <img src={user.photo} alt="" />
                                    <div>
                                        <label htmlFor="">Display Name: </label> {user.firstName} {user.lastName} {user.role === "admin" && "(Admin)"} <br />
                                        <label htmlFor="">Email address: </label> {user.emailAddress} <br />
                                        <label htmlFor="">Username: </label> {user.username} <br />
                                        {console.log(user.isBlocked)}
                                        {user.role !== "admin" ? (user.isBlocked ? 
                                            (<button onClick={() => setUserToUnblock(user)}>Unblock user</button>)
                                            :
                                            (<button onClick={() => setUserToBlock(user)}>Block user</button>)
                                        ) : ''}
                                    </div>
                                </div> 
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Users;