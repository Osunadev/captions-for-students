import React, { Component } from 'react';
import { Input, Form, Header, Icon, Message } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const options = [
    {
        key: 'fcqi',
        text: 'Facultad de Ciencias Químicas e Ingeniería',
        value: 'Facultad de Ciencias Químicas e Ingeniería',
    },
    { key: 'fa', text: 'Facultad de Artes', value: 'Facultad de Artes' },
    {
        key: 'fca',
        text: 'Facultad de Contaduría y Administración',
        value: 'Facultad de Contaduría y Administración',
    },
    { key: 'fd', text: 'Facultad de Deportes', value: 'Facultad de Deportes' },
    { key: 'fdd', text: 'Facultad de Derecho', value: 'Facultad de Derecho' },
    {
        key: 'feyri',
        text: 'Facultad de Economía y Relaciones Internacionales',
        value: 'Facultad de Economía y Relaciones Internacionales',
    },
    {
        key: 'fo',
        text: 'Facultad de Odontología',
        value: 'Facultad de Odontología',
    },
];

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            faculty: '',
            registerStatus: undefined,
            message: '',
            messageVisible: false,
            loading: false,
            admissionDate: '',
        };
    }

    handleDismiss = () => {
        this.setState({ messageVisible: false });
    };

    handleSpecialField = (event, data) => {
        this.setState({ [data.name]: data.value });
    };

    handleChange = (event, data) => {
        const { name } = event.target;

        this.setState({ [name]: event.target.value });
    };

    handleSubmit = async () => {
        const {
            name,
            lastName,
            faculty,
            admissionDate,
            email,
            password,
        } = this.state;

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
                    admissionDate,
                    faculty,
                    type: 'student',
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
            admissionDate: '',
            faculty: '',
        });
    };

    render() {
        const {
            name,
            lastName,
            faculty,
            email,
            password,
            passwordConfirm,
            message,
            registerStatus,
            messageVisible,
            loading,
            admissionDate,
        } = this.state;

        return (
            <div
                style={{ width: '650px', margin: '0 auto', paddingTop: '48px' }}
            >
                <Form onSubmit={this.handleSubmit} loading={loading}>
                    <Header as="h1" style={{ marginBottom: '16px' }}>
                        <Icon name="user circle" />
                        <Header.Content>
                            Registro de Estudiante
                            <Header.Subheader>
                                Datos necesarios para el registro de un
                                estudiante
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
                    <Form.Select
                        name="faculty"
                        label="Facultad"
                        options={options}
                        onChange={this.handleSpecialField}
                        value={faculty}
                        placeholder="Facultad a la que pertenece"
                    />

                    <Form.Field
                        label="Fecha de Ingreso a la Universidad"
                        onChange={this.handleSpecialField}
                        value={admissionDate}
                        control={SemanticDatepicker}
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
                    <Form.Button primary>Registrar Estudiante</Form.Button>
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

export default StudentForm;
