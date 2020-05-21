import React, { Component } from 'react';
import { Message, Card, Header, Loader } from 'semantic-ui-react';

import TeacherItem from '../teacher-item/teacher-item.component';

import { getUsers } from '../../../firebase/firebase.utils';

class TeacherPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            errorMsg: undefined,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            try {
                const teachers = await getUsers('teacher');
                this.setState({ teachers, isLoading: false });
            } catch (error) {
                this.setState({
                    errorMsg:
                        'Lo sentimos, no pudimos cargar los profesores, vuelva a cargar la página.',
                });
            }
        });
    }

    render() {
        const { teachers, isLoading, errorMsg } = this.state;

        return (
            <div
                style={{
                    width: '80vw',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <Header as="h1" style={{ margin: '32px 0 48px' }}>
                    <Header.Content>Panel de Profesores</Header.Content>
                </Header>
                {isLoading ? (
                    <Loader active inline="centered" size="large" />
                ) : (
                    <Card.Group centered>
                        {errorMsg ? (
                            <Message negative>
                                <Message.Header>Error de carga</Message.Header>
                                <p>{errorMsg}</p>
                            </Message>
                        ) : (
                            teachers.map(teacher => (
                                <TeacherItem {...teacher} key={teacher.uid} />
                            ))
                        )}
                    </Card.Group>
                )}
            </div>
        );
    }
}

export default TeacherPanel;
