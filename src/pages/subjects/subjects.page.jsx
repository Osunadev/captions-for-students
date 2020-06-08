import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import SubjectsPanel from '../../components/subjects-panel/subjects-panel.component';
import StudentSubjects from '../../components/student-subjects/student-subjects.component';

class SubjectsPage extends Component {
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
                <Route exact path={match.path} component={SubjectsPanel} />
                <Route
                    path={`${match.path}/:uid`}
                    component={StudentSubjects}
                />
            </Switch>
        );
    }
}

export default SubjectsPage;
