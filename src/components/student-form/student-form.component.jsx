import React, { Component } from 'react';
import { Input, Form, Header, Icon, Message } from 'semantic-ui-react';

import {
    auth,
    getFakeData,
    createUserProfileDocument,
    markDataAsRegistered,
} from '../../firebase/firebase.utils';

import Search from '../search/search.component';

class StudentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Personal info
            name: '',
            lastName: '',
            email: '',
            faculty: '',
            gender: '',
            campus: '',
            studentId: '',
            admissionDate: '',
            password: '',
            passwordConfirm: '',
            //
            dataSource: null,
            userDataLoaded: false,
            registerStatus: undefined,
            message: '',
            messageVisible: false,
            loading: false,
        };
    }

    async componentDidMount() {
        const dataSource = await getFakeData('baseStudents');

        this.setState({ dataSource });
    }

    setUserData = data => {
        this.setState({
            ...data,
            userDataLoaded: true,
            password: '',
            passwordConfirm: '',
        });
    };

    handleDismiss = () => {
        this.setState({ messageVisible: false });
    };

    handleChange = event => {
        const { name } = event.target;

        this.setState({ [name]: event.target.value });
    };

    handleSubmit = async () => {
        const { password, passwordConfirm } = this.state;

        if (password !== passwordConfirm)
            return this.setState({
                registerStatus: 'failure',
                message: 'Ambas contraseñas deben coincidir.',
                messageVisible: true,
            });

        if (password.length < 8)
            return this.setState({
                registerStatus: 'failure',
                message: 'Contraseña débil, debe ser de 8 caracteres mínimo.',
                messageVisible: true,
            });

        this.setState({ loading: true });

        try {
            const {
                name,
                lastName,
                email,
                faculty,
                gender,
                campus,
                studentId,
                admissionDate,
            } = this.state;

            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            try {
                // After the user was correctly registed
                const successMsg = await createUserProfileDocument(user, {
                    name,
                    lastName,
                    email,
                    faculty,
                    gender,
                    admissionDate,
                    campus,
                    studentId,
                    type: 'student',
                });

                // Checking the user as registered, so that it won't be shown ever again
                markDataAsRegistered('baseStudents', 'studentId', studentId);

                const updatedDataSource = this.state.dataSource.filter(
                    data => data.studentId !== studentId
                );

                // Clearing form fields and setting success message
                this.setState({
                    registerStatus: 'success',
                    message: successMsg,
                    messageVisible: true,
                    loading: false,
                    dataSource: updatedDataSource,
                });
            } catch (errorMsg) {
                // If we couln't register the user info into the firestore, we delete the user
                await user.delete();

                this.setState({
                    registerStatus: 'failure',
                    message: 'Lo sentimos, no pudimos registrar al usuario.',
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
        } finally {
            // Clearing form fields
            this.setState({
                name: '',
                lastName: '',
                email: '',
                faculty: '',
                admissionDate: '',
                gender: '',
                campus: '',
                studentId: '',
                password: '',
                passwordConfirm: '',
                userDataLoaded: false,
            });
        }
    };

    render() {
        const { dataSource } = this.state;
        return (
            <div
                style={{
                    width: '650px',
                    margin: '0 auto 80px auto',
                    paddingTop: '48px',
                }}
            >
                <Header as="h1" style={{ marginBottom: '32px' }} id="proxima">
                    <Icon name="user circle" />
                    <Header.Content>
                        <span style={{ fontWeight: 'normal' }}>
                            Registro de Estudiante
                        </span>
                        <Header.Subheader>
                            Datos obtenidos del estudiante a registrar
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Search
                    setUserData={this.setUserData}
                    dataSource={dataSource}
                    type="student"
                />
                <Form
                    onSubmit={this.handleSubmit}
                    loading={this.state.loading}
                    id="fonts"
                >
                    <Form.Field
                        id="fonts"
                        name="name"
                        label="Nombre(s)"
                        placeholder="Nombre(s)"
                        value={this.state.name}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="lastName"
                        label="Apellido(s)"
                        placeholder="Apellido(s)"
                        value={this.state.lastName}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="email"
                        label="Correo Institucional"
                        iconPosition="left"
                        icon="at"
                        placeholder="Correo UABC (@uabc.edu.mx)"
                        value={this.state.email}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="studentId"
                        label="Matrícula del Estudiante"
                        iconPosition="left"
                        icon="id badge"
                        placeholder="Matrícula"
                        value={this.state.studentId}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="campus"
                        label="Unidad Universitaria"
                        placeholder="Campus UABC"
                        value={this.state.campus}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="faculty"
                        label="Unidad Académica"
                        placeholder="Facultad"
                        value={this.state.faculty}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="admissionDate"
                        label="Fecha de Admisión a la Universidad"
                        placeholder="Fecha de Admisión: dd/mm/yyyy"
                        value={this.state.admissionDate}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="gender"
                        label="Género"
                        iconPosition="left"
                        icon="intergender"
                        placeholder="Género"
                        value={this.state.gender}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        id="fonts"
                        name="password"
                        label="Contraseña"
                        iconPosition="left"
                        icon="lock"
                        placeholder="Contraseña"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        control={Input}
                        disabled={!this.state.userDataLoaded}
                    />
                    <Form.Field
                        id="fonts"
                        name="passwordConfirm"
                        label="Repetir Contraseña"
                        iconPosition="left"
                        icon="lock"
                        placeholder="Repetir Contraseña"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.passwordConfirm}
                        control={Input}
                        disabled={!this.state.userDataLoaded}
                    />
                    <Form.Button
                        id="fonts"
                        primary
                        size="large"
                        disabled={!this.state.userDataLoaded}
                    >
                        Registrar Estudiante
                    </Form.Button>
                </Form>
                {this.state.registerStatus && this.state.messageVisible && (
                    <Message
                        id="fonts"
                        error={this.state.registerStatus === 'failure'}
                        success={this.state.registerStatus === 'success'}
                        header={
                            <span id="fonts" style={{ fontSize: '16px' }}>
                                <strong>
                                    {this.state.registerStatus === 'success'
                                        ? 'Registro Exitoso'
                                        : 'Registro Fallido'}
                                </strong>
                            </span>
                        }
                        content={this.state.message}
                        onDismiss={this.handleDismiss}
                    />
                )}
            </div>
        );
    }
}

export default StudentForm;
