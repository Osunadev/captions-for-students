import React from 'react';

import {
    Switch,
    Redirect,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';
import StudentPanel from '../../components/student-panel/student-panel.component';
import TranscriptionsPanel from '../../components/transcriptions-panel/transcriptions-panel.component';

const StudentPage = ({ user }) => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/student"
                        render={({ ...routeProps }) => (
                            <StudentPanel user={user} {...routeProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/:subjectId"
                        component={TranscriptionsPanel}
                    />
                    <Route path="*" render={() => <Redirect to="/student" />} />
                </Switch>
            </Router>
        </div>
    );
};

export default StudentPage;
