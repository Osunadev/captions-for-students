import React from 'react';
import Footer from '../../components/footer/footer.component';

import {
    Switch,
    Redirect,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';
import StudentPanel from '../../components/student-panel/student-panel.component';
import TranscriptionsPanel from '../../components/transcriptions-panel/transcriptions-panel.component';
import HomeMenu from '../../components/menu/menu.component';

const StudentPage = ({ user }) => {
    return (
        <div>
            <Router>
                <Route
                    path="/"
                    render={({ ...routeProps }) => (
                        <HomeMenu {...routeProps} studentMenu />
                    )}
                />
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
            <Footer />
        </div>
    );
};

export default StudentPage;
