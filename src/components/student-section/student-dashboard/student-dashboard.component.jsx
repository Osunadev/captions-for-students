import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import StudentDashboardDivider from '../student-dashboard-divider/student-dashboard-divider.component';
import StudentDashboardAccount from '../student-dashboard-account/student-dashboard-account.component';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.match.params.uid,
            visibleComponent: 'select',
        };
    }

    changeVisibleComponent = componentName => {
        this.setState({ visibleComponent: componentName });
    };

    render() {
        const { uid, visibleComponent } = this.state;

        return (
            <div
                style={{
                    width: '1000px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <Header as="h1" style={{ margin: '32px 0 48px' }} id="proxima">
                    <Header.Content>
                        {' '}
                        <span style={{ fontWeight: 'normal' }}>
                            Dashboard de Estudiante
                        </span>
                    </Header.Content>
                </Header>
                {
                    {
                        select: (
                            <StudentDashboardDivider
                                changeVisibleComponent={
                                    this.changeVisibleComponent
                                }
                            />
                        ),
                        account: <StudentDashboardAccount uid={uid} />,
                    }[visibleComponent]
                }
            </div>
        );
    }
}

export default StudentDashboard;
