import React, { Component } from 'react';
import { Form, Input, Loader, Message, Button } from 'semantic-ui-react';

import { getUser } from '../../../firebase/firebase.utils';

class TeacherDashboardAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errorMsg: undefined,
            user: undefined,
        };
    }
    componentDidMount() {
        const { uid } = this.props;

        this.setState({ isLoading: true }, async () => {
            try {
                const user = await getUser(uid);
                this.setState({ user, isLoading: false });
            } catch (error) {
                this.setState({ errorMsg: error.message, isLoading: false });
            }
        });
    }

    render() {
        const { user, isLoading, errorMsg } = this.state;

        return (
            <div
                style={{
                    width: '600px',
                    margin: '0 auto',
                }}
            >
                {isLoading && (
                    <Loader
                        active
                        inline="centered"
                        size="large"
                        style={{ marginTop: '64px' }}
                    />
                )}

                {errorMsg && (
                    <Message negative size="large">
                        <Message.Header>Usuario No Encontrado</Message.Header>
                        <p>{errorMsg}</p>
                    </Message>
                )}

                {user && (
                    <>
                        <Form
                            size="large"
                            widths="equal"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                width: '450px',
                                margin: '0 auto 32px auto',
                            }}
                        >
                            <Form.Field
                                inline
                                label="Nombre(s)"
                                value={user.name}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Apellido(s)"
                                value={user.lastName}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Grado de Estudios"
                                iconPosition="left"
                                icon="student"
                                value={user.grade}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Correo Institucional"
                                iconPosition="left"
                                icon="at"
                                value={user.email}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Número de Empleado"
                                iconPosition="left"
                                icon="id badge"
                                value={user.teacherId}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Unidad Universitaria"
                                value={user.campus}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Unidad Académica"
                                value={user.faculty}
                                control={Input}
                                readOnly
                            />
                            <Form.Field
                                inline
                                label="Género"
                                iconPosition="left"
                                icon="intergender"
                                value={user.gender}
                                control={Input}
                                readOnly
                            />
                        </Form>
                        <Button primary>Eliminar Cuenta</Button>
                    </>
                )}
            </div>
        );
    }
}

export default TeacherDashboardAccount;
