import { useState, useEffect } from 'react';
// import {API_URL} from '../../config.js';

const ConnectionTest = () => {
    const [status, setStatus] = useState('Testing connection...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await fetch(`${API_URL}/home`);
                if (response.ok) {
                    const data = await response.text();
                    setStatus('Connection successful! Backend response: ' + data);
                    setError(null);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (err) {
                setStatus('Connection failed');
                setError(err.message);
            }
        };

        testConnection();
    }, []);

    return (
        <></>
        // <div style={{ padding: '20px', margin: '20px', border: '1px solid #ccc' }}>
        //     <h2>Backend Connection Test</h2>
        //     <p>Status: {status}</p>
        //     {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        //     <p>API URL: {API_URL}</p>
        // </div>
    );
};

export default ConnectionTest; 