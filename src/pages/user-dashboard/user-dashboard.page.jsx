import React from 'react';
import Footer from '../../components/footer/footer.component';

import {
    Switch,
    Redirect,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';
import UserSubjectsDashboard from '../../components/user-subjects-dashboard/user-subjects-dashboard.component';
import TranscriptionsPanel from '../../components/transcriptions-panel/transcriptions-panel.component';
import HomeMenu from '../../components/menu/menu.component';

const UserDashboard = ({ user }) => {
    return (
        <div>
            <Router>
                <Route
                    path="/"
                    render={({ ...routeProps }) => (
                        <HomeMenu {...routeProps} userMenu />
                    )}
                />
                <Switch>
                    <Route
                        exact
                        path={'/' + user.type}
                        render={({ ...routeProps }) => (
                            <UserSubjectsDashboard
                                user={user}
                                {...routeProps}
                            />
                        )}
                    />
                    <Route
                        exact
                        path={`/${user.type}/:subjectId`}
                        render={({ ...routeProps }) => (
                            <TranscriptionsPanel
                                userType={user.type}
                                {...routeProps}
                            />
                        )}
                    />
                    <Route
                        path="*"
                        render={() => <Redirect to={'/' + user.type} />}
                    />
                </Switch>
            </Router>
            <Footer />
        </div>
    );
};

export default UserDashboard;
