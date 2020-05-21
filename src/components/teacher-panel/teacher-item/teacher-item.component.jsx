import React from 'react';

import { withRouter } from 'react-router-dom';

import teacherMale from '../../../assets/steve.jpg';
import teacherFemale from '../../../assets/molly.png';

import { Card, Button, Image } from 'semantic-ui-react';

const titleAbrev = (studyGrade, gender) => {
    switch (studyGrade) {
        case 'Doctorado':
            return 'Dr.';
        case 'Maestría':
            return gender === 'Masculino' ? 'Mtro.' : 'Mtra.';
        case 'Licenciatura':
            return 'Lic.';
    }
};

const TeacherItem = ({ history, match, location, ...personalProps }) => {
    const onCardClick = () => {
        history.push(match.path + '/' + personalProps.uid);
    };

    const {
        name,
        lastName,
        email,
        employeeId,
        grade,
        gender,
        campus,
        faculty,
        ...otherPersonalProps
    } = personalProps;

    const gradeAbrev = titleAbrev(grade, gender);

    return (
        <Card>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src={gender === 'Masculino' ? teacherMale : teacherFemale}
                />
                <Card.Header>
                    {gradeAbrev + ' ' + name + ' ' + lastName}
                </Card.Header>
                <Card.Meta>{email}</Card.Meta>
                <Card.Description>
                    <strong>{campus}</strong>
                    <p>{faculty}</p>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={onCardClick} color="green">
                    Administrar
                </Button>
            </Card.Content>
        </Card>
    );
};

export default withRouter(TeacherItem);
