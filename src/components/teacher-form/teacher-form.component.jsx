import React, { Component } from 'react';
import { Input, Form, Header, Icon, Message } from 'semantic-ui-react';

import {
    auth,
    createUserProfileDocument,
    getFakeData,
    markDataAsRegistered,
} from '../../firebase/firebase.utils';

import Search from '../search/search.component';

class TeacherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Personal info
            name: '',
            lastName: '',
            email: '',
            faculty: '',
            gender: '',
            grade: '',
            campus: '',
            employeeId: '',
            password: '',
            passwordConfirm: '',
            //
            dataSource: null,
            userDataSetted: false,
            registerStatus: undefined,
            message: '',
            messageVisible: false,
            loading: false,
        };
    }

    async componentDidMount() {
        const dataSource = await getFakeData('baseTeachers');

        this.setState({ dataSource });
    }

    setUserData = data => {
        this.setState({
            ...data,
            userDataSetted: true,
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
                grade,
                campus,
                employeeId,
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
                    grade,
                    campus,
                    employeeId,
                    type: 'teacher',
                });

                // Checking the user as registered, so that it won't be shown ever again
                await markDataAsRegistered(
                    'baseTeachers',
                    'employeeId',
                    employeeId
                );

                const updatedDataSource = this.state.dataSource.filter(
                    data => data.employeeId !== employeeId
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
            const { email, pass } = this.props;
            await auth.signInWithEmailAndPassword(email, pass);

            this.setState({
                name: '',
                lastName: '',
                email: '',
                faculty: '',
                gender: '',
                grade: '',
                campus: '',
                employeeId: '',
                password: '',
                passwordConfirm: '',
                userDataSetted: false,
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
                            Registro de Profesor
                        </span>
                        <Header.Subheader>
                            Datos obtenidos del profesor a registrar
                        </Header.Subheader>
                    </Header.Content>
                </Header>
                <Search
                    dataSource={dataSource}
                    setUserData={this.setUserData}
                    type="teacher"
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
                        name="grade"
                        label="Grado de Estudios"
                        iconPosition="left"
                        icon="student"
                        placeholder="Lic, Mtro o Dr"
                        value={this.state.grade}
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
                        name="employeeId"
                        label="Número de Empleado"
                        iconPosition="left"
                        icon="id badge"
                        placeholder="Numero de Empleado"
                        value={this.state.employeeId}
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
                        disabled={!this.state.userDataSetted}
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
                        disabled={!this.state.userDataSetted}
                    />
                    <Form.Button
                        id="fonts"
                        primary
                        size="large"
                        disabled={!this.state.userDataSetted}
                    >
                        Registrar Profesor
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

export default TeacherForm;
