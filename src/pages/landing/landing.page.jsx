import React from 'react';
import logo from '../../assets/escudo-uabc.png';

const LandingPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '800px',
                margin: '64px auto 0 auto',
                justifyContent: 'center',
            }}
        >
            <img src={logo} alt="logo-esucod-uabc" height="350px" />
            <div
                style={{
                    marginLeft: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <h1
                    style={{
                        fontSize: '48px',
                        width: '400px',
                        textAlign: 'center',
                    }}
                >
                    Subtítulos para Estudiantes
                </h1>
                <p
                    style={{
                        fontSize: '20px',
                        width: '400px',
                        textJustify: 'inter-word',
                        textAlign: 'justify',
                    }}
                >
                    Subtítulos para Estudiantes es una plataforma enfocada en
                    ayudar a los estudiantes sordos de la UABC, al asistir a sus
                    clases, generando transcripciones en tiempo real y
                    utilizando servicios en la nube para almacenar estas
                    transcripciones en forma de notas.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
