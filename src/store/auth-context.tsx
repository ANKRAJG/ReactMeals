import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthCtxObj {
    isLoggedIn: boolean | null;
    appLoaded: boolean | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthCtxObj>({
    isLoggedIn: null,
    appLoaded: null,
    login: (email, password) => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [appLoaded, setAppLoaded] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedLoggedInInfo = sessionStorage.getItem('isLoggedIn');
        if(storedLoggedInInfo === '1') {
          setIsLoggedIn(true);
        }
        setAppLoaded(true);
    }, []);

    const loginHandler = (email: string, password: string) => {
        // We should of course check email and password
        // But it's just a dummy/demo anyways
        sessionStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };
    
    const logoutHandler = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate('/login');
    };

    const authCtxValue: AuthCtxObj = {
        isLoggedIn,
        appLoaded,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={authCtxValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;