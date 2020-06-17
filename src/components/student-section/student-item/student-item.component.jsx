import React from 'react';

import { withRouter } from 'react-router-dom';

import teacherMale from '../../../assets/steve.jpg';
import teacherFemale from '../../../assets/molly.png';

import { Card, Button, Image } from 'semantic-ui-react';
import './student-item.styles.css';

const StudentItem = ({
    history,
    match,
    location,
    withoutBtn,
    ...personalProps
}) => {
    const onCardClick = () => {
        history.push(match.path + '/' + personalProps.uid);
    };

    const {
        name,
        lastName,
        email,
        studentId,
        gender,
        campus,
        faculty,
        ...otherPersonalProps
    } = personalProps;

    const contentProps = withoutBtn
        ? {
              className: 'hover-content',
              onClick: onCardClick,
          }
        : {};

    return (
        <Card {...contentProps}>
            <Card.Content style={{ padding: withoutBtn ? '32px' : '16px' }}>
                <Image
                    floated="right"
                    size="mini"
                    src={gender === 'Masculino' ? teacherMale : teacherFemale}
                />
                <Card.Header>{name + ' ' + lastName}</Card.Header>
                <Card.Meta>{email}</Card.Meta>
                <Card.Description>
                    <strong>{campus}</strong>
                    <p>{faculty}</p>
                    <p>{studentId}</p>
                </Card.Description>
            </Card.Content>
            {!withoutBtn && (
                <Card.Content extra>
                    <Button color="green" onClick={onCardClick}>
                        Administrar
                    </Button>
                </Card.Content>
            )}
        </Card>
    );
};

export default withRouter(StudentItem);
