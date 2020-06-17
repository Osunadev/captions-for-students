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
                'Password2020'
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
                await markDataAsRegistered(
                    'baseStudents',
                    'studentId',
                    studentId
                );

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
            const { email, pass } = this.props;
            await auth.signInWithEmailAndPassword(email, pass);

            this.setState({
                name: '',
                lastName: '',
                email: '',
                faculty: '',
                admissionDate: '',
                gender: '',
                campus: '',
                studentId: '',
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
                    margin: '0 auto 96px auto',
                    paddingTop: '48px',
                }}
            >
                <Header as="h1" style={{ marginBottom: '32px' }}>
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
                <Form onSubmit={this.handleSubmit} loading={this.state.loading}>
                    <Form.Field
                        name="name"
                        label="Nombre(s)"
                        placeholder="Nombre(s)"
                        value={this.state.name}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="lastName"
                        label="Apellido(s)"
                        placeholder="Apellido(s)"
                        value={this.state.lastName}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
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
                        name="campus"
                        label="Unidad Universitaria"
                        placeholder="Campus UABC"
                        value={this.state.campus}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="faculty"
                        label="Unidad Académica"
                        placeholder="Facultad"
                        value={this.state.faculty}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="admissionDate"
                        label="Fecha de Admisión a la Universidad"
                        placeholder="Fecha de Admisión: dd/mm/yyyy"
                        value={this.state.admissionDate}
                        control={Input}
                        readOnly
                    />
                    <Form.Field
                        name="gender"
                        label="Género"
                        iconPosition="left"
                        icon="intergender"
                        placeholder="Género"
                        value={this.state.gender}
                        control={Input}
                        readOnly
                    />

                    <Form.Button
                        primary
                        size="large"
                        disabled={!this.state.userDataLoaded}
                    >
                        Registrar Estudiante
                    </Form.Button>
                </Form>
                {this.state.registerStatus && this.state.messageVisible && (
                    <Message
                        error={this.state.registerStatus === 'failure'}
                        success={this.state.registerStatus === 'success'}
                        header={
                            <span style={{ fontSize: '16px' }}>
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
