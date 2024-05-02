import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    setLoginState: () => {}
});

export default AuthContext;