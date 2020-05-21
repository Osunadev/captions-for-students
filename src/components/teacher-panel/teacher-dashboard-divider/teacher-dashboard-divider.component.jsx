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
                            Información de Cuenta
                        </Header>

                        <Button
                            primary
                            basic
                            onClick={() => changeVisibleComponent('account')}
                        >
                            Acceder
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name="briefcase" />
                            Mis Materias
                        </Header>
                        <Button primary basic>
                            Acceder
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
};

export default TeacherSelectDivider;
