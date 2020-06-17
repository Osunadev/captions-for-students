import React, { Component } from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import Footer from '../../components/footer/footer.component';

import { auth } from '../../firebase/firebase.utils';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pasword: '',
            errorTitle: '',
            errorMessage: '',
            hasError: false,
            isLoading: false,
        };
    }

    closeMessage = () => {
        this.setState({ hasError: false });
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    onFormSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        this.setState({ isLoading: true });

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.props.setCredentials(email, password);
        } catch ({ message }) {
            this.setState({
                isLoading: false,
                hasError: true,
                errorMessage: message,
                errorTitle: 'Cuenta no registrada',
            });
        }
    };

    render() {
        const {
            email,
            password,
            isLoading,
            errorTitle,
            errorMessage,
            hasError,
        } = this.state;

        return (
            <>
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        width: '100vw',
                        height: '100vh',
                        background: '#0e723f',
                    }}
                >
                    <div
                        style={{
                            margin: '80px auto 0 auto',
                            width: '650px',
                        }}
                    >
                        <h1
                            style={{
                                fontSize: '38px',
                                color: 'yellow',
                                marginBottom: '32px',
                                textAlign: 'center',
                                padding: '16px',
                            }}
                        >
                            <Icon
                                name="closed captioning"
                                style={{ marginRight: '16px' }}
                            />
                            Subtítulos para Estudiantes
                        </h1>

                        <div
                            style={{
                                background: 'white',
                                padding: '48px 32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: '6px',
                            }}
                        >
                            <h2 style={{ fontSize: '36px' }}>
                                Inicio de Sesión
                            </h2>
                            <div style={{ width: '550px' }}>
                                <Form
                                    loading={isLoading}
                                    size="large"
                                    onSubmit={this.onFormSubmit}
                                >
                                    <Form.Input
                                        label="Correo Electrónico"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input
                                        label="Contraseña"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                    <Button>Iniciar Sesión</Button>
                                </Form>
                                {hasError && (
                                    <Message
                                        error
                                        header={errorTitle}
                                        content={errorMessage}
                                        onDismiss={this.closeMessage}
                                        style={{ marginTop: '24px' }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Login;
