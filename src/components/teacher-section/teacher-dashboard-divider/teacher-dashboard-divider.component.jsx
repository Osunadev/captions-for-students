import React from 'react';

import {
    Header,
    Segment,
    Button,
    Divider,
    Grid,
    Icon,
} from 'semantic-ui-react';

const TeacherSelectDivider = ({ changeVisibleComponent }) => {
    return (
        <Segment placeholder style={{ backgroundColor: 'white' }}>
            <Grid columns={2} stackable textAlign="center">
                <Divider vertical>O</Divider>

                <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                        <Header icon>
                            <Icon name="user circle" />
                            <span>Información de Cuenta</span>
                        </Header>

                        <Button
                            style={{ background: '#DD971A', color: 'white' }}
                            onClick={() => changeVisibleComponent('account')}
                        >
                            Acceder
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name="briefcase" />
                            <span>Mis Materias</span>
                        </Header>
                        <Button
                            style={{ background: '#DD971A', color: 'white' }}
                        >
                            Acceder
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default TeacherSelectDivider;
