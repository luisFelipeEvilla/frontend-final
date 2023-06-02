import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const cookies = parseCookies();

        console.log(cookies);
        if (!cookies.user) {
            return null;
        } else {
            const user = await JSON.parse(cookies.user);

            return user;
        }
    }

    const login = (user) => {
        setUser(user);

        // save user in cookies
        setCookie(null, 'user', JSON.stringify(user), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

    const logout = () => {
        setUser({});

        // remove user from cookies
        setCookie(null, 'user', '', {
            maxAge: -1,
            path: '/',
        });
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, checkLogin }}>
            {children}
        </AuthContext.Provider>
    );
}