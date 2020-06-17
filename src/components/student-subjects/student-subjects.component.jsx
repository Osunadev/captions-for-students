import React, { Component } from 'react';

import SubjectItem from '../../components/subject-item/subject-item.component';
import { Loader, Header, Icon, Item, Modal, Button } from 'semantic-ui-react';
import {
    getUser,
    getSubjects,
    checkRegisteredSubjects,
    checkIfTeacherIsRegistered,
    registerSubject,
} from '../../firebase/firebase.utils';
import TeacherForm from '../teacher-form/teacher-form.component';

class StudentSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            uid: props.match.params.uid,
            subjects: [],
            user: null,
            modalOpen: false,
            modalTeacherId: '',
        };
    }

    async componentDidMount() {
        const { uid } = this.state;

        this.setState({ isLoading: true });

        const user = await getUser(uid);
        const { studentId } = user;

        // Getting the subjects of the current student
        let subjects = await getSubjects(
            'baseSubjects',
            'studentIds',
            studentId
        );

        // Updating which of the subjects are registered, updating the same subjects object
        await checkRegisteredSubjects(subjects, studentId);

        this.setState({ isLoading: false, subjects, user });
    }

    handleCloseModal = () => {
        this.setState({ modalOpen: false });
    };

    onSubjectClick = async subjectIdx => {
        const { subjects, user } = this.state;

        // Keeping only the relevant data for its storage
        const { isRegistered, studentIds, ...subjectData } = subjects[
            subjectIdx
        ];

        // Adding only the current user id, because he's the only that registered the subject
        subjectData['studentIds'] = [user.studentId];

        // First we check if the teacher is already registered
        const isTeacherRegistered = await checkIfTeacherIsRegistered(
            subjectData.teacherId
        );

        if (isTeacherRegistered) {
            // We can proceed to register the subject into the 'subjects' colection
            const isSubjectRegistered = await registerSubject(subjectData);

            if (isSubjectRegistered) {
                // Updating the registered subject
                const udpatedSubjects = [...subjects];
                udpatedSubjects[subjectIdx].isRegistered = true;

                this.setState({ subjects: udpatedSubjects });
            } else {
                console.log('No pudimos registrar la materia');
            }
        } else {
            this.setState({
                modalOpen: true,
                modalTeacherId: subjectData.teacherId,
            });
        }
    };

    render() {
        const {
            isLoading,
            subjects,
            user,
            modalOpen,
            modalTeacherId,
        } = this.state;

        return (
            <>
                <Modal open={modalOpen} onClose={this.handleCloseModal}>
                    <Header>Profesor no registrado en la plataforma</Header>
                    <Modal.Content scrolling>
                        <p>
                            Al parecer el profesor encargado de la materia no se
                            encuentra registrado en la plataforma, por favor
                            regístrelo con el siguiente código:
                        </p>
                        <h3 style={{ textAlign: 'center' }}>
                            {modalTeacherId}
                        </h3>
                        <Modal.Description>
                            <TeacherForm />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseModal}>
                            Salir del Registro
                        </Button>
                    </Modal.Actions>
                </Modal>
                <div
                    style={{
                        width: '70vw',
                        margin: '32px auto 90px auto',
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
                                />
                            ))}
                        </Item.Group>
                    )}
                </div>
            </>
        );
    }
}

export default StudentSubjects;
