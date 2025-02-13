import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import CategoryTree from './components/CategoryTree';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const handleLogin = (token) => {
        setToken(token);
    };

    const handleLogout = () => {
        setToken('');
    };

    return (
        <div className="App">
            <main>
                {token ? <CategoryTree token={token} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
            </main>
        </div>
    );
}

export default App;
