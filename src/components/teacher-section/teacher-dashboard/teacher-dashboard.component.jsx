import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

import TeacherDashboardDivider from '../teacher-dashboard-divider/teacher-dashboard-divider.component';
import TeacherDashboardAccount from '../teacher-dashboard-account/teacher-dashboard-account.component';

class TeacherDashboard extends Component {
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
                        <span style={{ fontWeight: 'normal' }}>
                            Dashboard de Profesor
                        </span>
                    </Header.Content>
                </Header>
                {
                    {
                        select: (
                            <TeacherDashboardDivider
                                changeVisibleComponent={
                                    this.changeVisibleComponent
                                }
                            />
                        ),
                        account: <TeacherDashboardAccount uid={uid} />,
                    }[visibleComponent]
                }
            </div>
        );
    }
}

export default TeacherDashboard;
