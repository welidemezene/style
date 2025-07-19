import React from 'react';

const WhiteBackgroundPage = ({ children }) => {
    return (
        <div
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
                background: '#fff',
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    );
};

export default WhiteBackgroundPage;
