import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeMenu from './components/menu/menu.component';
import TeacherForm from './components/teacher-form/teacher-form.component';
import StudentForm from './components/student-form/student-form.component';
import TeacherPanelPage from './pages/teacher-panel/teacher-panel.page';
import StudentPanelPage from './pages/student-panel/student-panel.page';
import SubjectsPage from './pages/subjects/subjects.page';
import LandingPage from './pages/landing/landing.page';
import LoginPage from './pages/login/login.page';
import Footer from './components/footer/footer.component';
import 'semantic-ui-css/semantic.min.css';

import { auth, getUser } from './firebase/firebase.utils';

class App extends Component {
    constructor() {
        super();

        this.state = {
            user: null,
            email: 'admin@uabc.edu.mx',
            pass: 'Password2020',
        };
    }

    setCredentials = (email, pass) => {
        this.setState({ email, pass });
    };

    componentDidMount() {
        this.unsuscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const { uid } = user;
                try {
                    const { type } = await getUser(uid);
                    if (type === 'admin') {
                        this.setState({
                            user,
                        });
                    }
                } catch (error) {
                    // If the user isn't an admin
                    console.log(error);
                }
            } else {
                this.setState({
                    user: null,
                });
            }
        });
    }

    render() {
        const { user, email, pass } = this.state;

        return user ? (
            <div>
                <Router>
                    <Route path="/" component={HomeMenu} />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route
                            path="/registro/estudiante"
                            render={(...routeProps) => (
                                <StudentForm
                                    {...routeProps}
                                    email={email}
                                    pass={pass}
                                />
                            )}
                        />
                        <Route
                            path="/registro/profesor"
                            render={(...routeProps) => (
                                <TeacherForm
                                    {...routeProps}
                                    email={email}
                                    pass={pass}
                                />
                            )}
                        />
                        <Route
                            path="/profesores"
                            component={TeacherPanelPage}
                        />
                        <Route
                            path="/estudiantes"
                            component={StudentPanelPage}
                        />
                        <Route path="/asignaturas" component={SubjectsPage} />
                    </Switch>
                    <Route path="/" component={Footer} />
                </Router>
            </div>
        ) : (
            <LoginPage setCredentials={this.setCredentials} />
        );
    }

    componentWillUnmount() {
        this.unsuscribeFromAuth();
    }
}

export default App;
