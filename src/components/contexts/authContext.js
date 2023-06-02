import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    useEffect(() => {
        // Comprueba si el usuario ya ha iniciado sesión
        const cookies = parseCookies();

        try {
            const userData = JSON.parse(cookies.user);
            const token = cookies.token;

            if (userData && token) {
                setUser(userData);
                setToken(token);
            }
        } catch (error) {
            console.error(error);
            window.location.href = '/iniciar';
        }
    }, []);

    const login = (user, token) => {
        setUser(user);
        setToken(token);

        // save token in cookies
        setCookie(null, 'token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        });

        // save user in cookies
        setCookie(null, 'user', JSON.stringify(user), {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

    const logout = () => {
        setUser({});
        setToken(null);

        // remove token from cookies
        setCookie(null, 'token', '', {
            maxAge: -1,
            path: '/'
        });

        // remove user from cookies
        setCookie(null, 'user', '', {
            maxAge: -1,
            path: '/',
        });
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}