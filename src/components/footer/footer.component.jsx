import React from 'react';

const Footer = () => {
    return (
        <div
            style={{
                background: 'rgb(224,153,17)',
                padding: '8px',
                position: 'fixed',
                bottom: '0',
                width: '100vw',
                textAlign: 'center',
            }}
        >
            <p style={{ margin: '0px', fontWeight: 'bold' }}>
                D.R.© Universidad Autónoma de Baja California, México, 2020.
            </p>
            <span style={{ textDecoration: 'underline' }}>
                Última Actualización: 07 de junio de 2020.
            </span>
        </div>
    );
};

export default Footer;
