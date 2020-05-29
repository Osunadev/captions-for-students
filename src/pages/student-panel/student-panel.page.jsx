import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import StudentPanel from '../../components/student-section/student-panel/student-panel.component';
import StudentDashboard from '../../components/student-section/student-dashboard/student-dashboard.component';

class StudentPanelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route exact path={match.path} component={StudentPanel} />
                <Route
                    path={`${match.path}/:uid`}
                    component={StudentDashboard}
                />
            </Switch>
        );
    }
}

export default StudentPanelPage;
