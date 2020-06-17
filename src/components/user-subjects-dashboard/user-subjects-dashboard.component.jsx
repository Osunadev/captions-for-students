import React, { Component } from 'react';
import { Item, Header, Loader, Icon } from 'semantic-ui-react';
import SubjectItem from '../subject-item/subject-item.component';

import { getUserSubjects } from '../../firebase/firebase.utils';

class UserSubjectsDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            subjects: [],
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, async () => {
            const { user } = this.state;

            const userId =
                user.type === 'student' ? user.studentId : user.teacherId;

            const subjects = await getUserSubjects(user.type, userId);

            this.setState({ subjects, isLoading: false });
        });
    }

    onSubjectClick = subjectArrayIdx => {
        const { subjects, user } = this.state;
        const { history } = this.props;

        const { subjectId } = subjects[subjectArrayIdx];

        history.push(`/${user.type}/${subjectId}`);
    };

    render() {
        const { subjects, isLoading, user } = this.state;

        return (
            <div style={{ padding: '32px 0 90px' }}>
                <div
                    style={{
                        width: '50vw',
                        margin: '0 auto',
                        padding: '16px 32px',
                        borderRadius: '10px',
                        border: '2px solid black',
                    }}
                >
                    <Header
                        as="h1"
                        style={{
                            margin: '32px 0 48px',
                            fontFamily: 'MinionPro',
                            textAlign: 'center',
                        }}
                    >
                        <Header.Content>
                            <span
                                style={{
                                    fontFamily: 'ProximaNova',
                                    fontWeight: 'normal',
                                }}
                            >
                                <span>
                                    <Icon name="book" />
                                    {user
                                        ? `Carga de Asignaturas de ${
                                              user.name.split(' ')[0]
                                          } ${user.lastName.split(' ')[0]} (${
                                              user.studentId
                                          })`
                                        : 'Carga de Asignaturas'}
                                </span>
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
                        <Item.Group divided>
                            {subjects.map((subjectData, idx) => (
                                <SubjectItem
                                    key={subjectData.subjectId}
                                    subjectData={subjectData}
                                    onSubjectClick={this.onSubjectClick}
                                    subjectArrayIdx={idx}
                                    showTranscriptions
                                />
                            ))}
                        </Item.Group>
                    )}
                </div>
            </div>
        );
    }
}

export default UserSubjectsDashboard;
