import React, { Component } from 'react';
import { Message, Card, Header, Loader, Icon } from 'semantic-ui-react';
import StudentItem from '../student-section/student-item/student-item.component';

import { getUsers } from '../../firebase/firebase.utils';

class StudentPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            errorMsg: undefined,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            try {
                const students = await getUsers('student');
                this.setState({ students, isLoading: false });
            } catch (error) {
                this.setState({
                    errorMsg:
                        'Lo sentimos, no pudimos cargar los estudiantes, vuelva a cargar la página.',
                });
            }
        });
    }

    render() {
        const { students, isLoading, errorMsg } = this.state;

        return (
            <div
                style={{
                    width: '80vw',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <Header
                    as="h1"
                    style={{ margin: '32px 0 48px', fontFamily: 'MinionPro' }}
                >
                    <Header.Content>
                        <span
                            style={{
                                fontFamily: 'ProximaNova',
                                fontWeight: 'normal',
                            }}
                        >
                            <Icon name="book" />
                            Vincular Asignaturas
                        </span>
                    </Header.Content>
                </Header>
                {isLoading ? (
                    <Loader
                        active
                        inline="centered"
                        size="large"
                        style={{ marginTop: '64px' }}
                    >
                        Cargando...
                    </Loader>
                ) : (
                    <Card.Group centered>
                        {errorMsg ? (
                            <Message negative>
                                <Message.Header>Error de carga</Message.Header>
                                <p>{errorMsg}</p>
                            </Message>
                        ) : (
                            students.map(student => (
                                <StudentItem
                                    {...student}
                                    key={student.uid}
                                    withoutBtn
                                />
                            ))
                        )}
                    </Card.Group>
                )}
            </div>
        );
    }
}

export default StudentPanel;
