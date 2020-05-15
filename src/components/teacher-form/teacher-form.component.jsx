import React, { Component } from 'react';
import { Input, Form, Header, Icon, Message } from 'semantic-ui-react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            registerStatus: undefined,
            message: '',
            messageVisible: false,
            loading: false,
        };
    }

    handleDismiss = () => {
        this.setState({ messageVisible: false });
    };

    handleChange = event => {
        const { name } = event.target;

        this.setState({ [name]: event.target.value });
    };

    handleSubmit = async () => {
        const { name, lastName, email, password } = this.state;

        this.setState({ loading: true });

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            try {
                // After the user was correctly registed
                const successMsg = await createUserProfileDocument(user, {
                    name,
                    lastName,
                    type: 'teacher',
                });

                // Signing out, because firebase keep logged in the new user we created
                await auth.signOut();

                // Clearing form fields and setting success message
                this.setState({
                    registerStatus: 'success',
                    message: successMsg,
                    messageVisible: true,
                    loading: false,
                });
            } catch (errorMsg) {
                // If we couldn't write user info into firecloud
                this.setState({
                    registerStatus: 'failure',
                    message: errorMsg,
                    messageVisible: true,
                    loading: false,
                });
            }
        } catch ({ message }) {
            // If we couldn't create our user
            this.setState({
                registerStatus: 'failure',
                message,
                messageVisible: true,
                loading: false,
            });
        }

        // Clearing form fields
        this.setState({
            name: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        });
    };

    render() {
        const {
            name,
            lastName,
            email,
            password,
            passwordConfirm,
            message,
            registerStatus,
            messageVisible,
            loading,
        } = this.state;

        return (
            <div
                style={{ width: '650px', margin: '0 auto', paddingTop: '48px' }}
            >
                <Form onSubmit={this.handleSubmit} loading={loading}>
                    <Header as="h1" style={{ marginBottom: '16px' }}>
                        <Icon name="user circle" />
                        <Header.Content>
                            Registro de Profesor
                            <Header.Subheader>
                                Datos necesarios para el registro de un profesor
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                    <Form.Field
                        name="name"
                        label="Nombre(s)"
                        placeholder="Nombre(s)"
                        onChange={this.handleChange}
                        value={name}
                        control={Input}
                    />
                    <Form.Field
                        name="lastName"
                        label="Apellido(s)"
                        placeholder="Apellido(s)"
                        onChange={this.handleChange}
                        value={lastName}
                        control={Input}
                    />
                    <Form.Field
                        name="email"
                        label="Correo Institucional"
                        iconPosition="left"
                        icon="at"
                        placeholder="Correo UABC (@uabc.edu.mx)"
                        onChange={this.handleChange}
                        value={email}
                        control={Input}
                    />
                    <Form.Field
                        name="password"
                        label="Contraseña"
                        iconPosition="left"
                        icon="lock"
                        placeholder="Contraseña"
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        control={Input}
                    />
                    <Form.Field
                        name="passwordConfirm"
                        label="Repetir Contraseña"
                        iconPosition="left"
                        icon="lock"
                        placeholder="Repetir Contraseña"
                        type="password"
                        onChange={this.handleChange}
                        value={passwordConfirm}
                        control={Input}
                    />
                    <Form.Button primary>Registrar Profesor</Form.Button>
                </Form>
                {registerStatus && messageVisible && (
                    <Message
                        error={registerStatus === 'failure'}
                        success={registerStatus === 'success'}
                        header={
                            registerStatus === 'success'
                                ? 'Registro Exitoso'
                                : 'Registro Fallido'
                        }
                        content={message}
                        onDismiss={this.handleDismiss}
                    />
                )}
            </div>
        );
    }
}

export default TeacherForm;
