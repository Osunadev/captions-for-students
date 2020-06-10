import React from 'react';
import { Button, Icon, Item, Label } from 'semantic-ui-react';

import classroom from '../../assets/classroom.png';

const SubjectItem = ({ subjectData, subjectArrayIdx, onSubjectClick }) => {
    return (
        <Item>
            <Item.Image src={classroom} />
            <Item.Content>
                <Item.Header>{`${subjectData.name} (${subjectData.code})`}</Item.Header>
                <Item.Meta>
                    <p>
                        {subjectData.isRegistered
                            ? 'Vinculada'
                            : 'No Vinculada'}
                    </p>
                    <p>
                        <strong>Profesor: </strong>{' '}
                        {`${subjectData.teacherName} (${subjectData.teacherId})`}
                    </p>
                </Item.Meta>
                <Item.Description>
                    <div>
                        <p>
                            <strong>
                                <u>Horario de Clase:</u>
                            </strong>
                        </p>
                        <ul>
                            {Object.values(subjectData.schedule).map(obj => (
                                <li>
                                    <strong>{obj.day}</strong> {obj.startTime}
                                    :00 - {obj.endTime}:00
                                </li>
                            ))}
                        </ul>
                    </div>
                </Item.Description>
                <Item.Extra>
                    <Label>Semestre #{subjectData.semester}</Label>
                    <Label>
                        Turno{' '}
                        {subjectData.shift === 'M' ? 'Matutino' : 'Vespertino'}
                    </Label>
                    {subjectData.isRegistered ? (
                        <Button
                            style={{ background: '#00723F', color: 'white' }}
                            floated="right"
                        >
                            Editar Materia
                        </Button>
                    ) : (
                        <Button
                            style={{ background: '#E09911' }}
                            floated="right"
                            onClick={() => onSubjectClick(subjectArrayIdx)}
                        >
                            Vincular Materia
                            <Icon name="right chevron" />
                        </Button>
                    )}
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default SubjectItem;
