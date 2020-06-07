import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeMenu from './components/menu/menu.component';
import TeacherForm from './components/teacher-form/teacher-form.component';
import StudentForm from './components/student-form/student-form.component';
import TeacherPanelPage from './pages/teacher-panel/teacher-panel.page';
import StudentPanelPage from './pages/student-panel/student-panel.page';
import LandingPage from './pages/landing/landing.page';
import LoginPage from './pages/login/login.page';
import Footer from './components/footer/footer.component';
import 'semantic-ui-css/semantic.min.css';

import { auth, getUser } from './firebase/firebase.utils';

class App extends Component {
    constructor() {
        super();

        this.state = {
            user: true,
        };
    }

    componentDidMount() {
        // this.unsuscribeFromAuth = auth.onAuthStateChanged(async user => {
        //     if (user) {
        //         const { uid } = user;
        //         try {
        //             const { type } = await getUser(uid);
        //             if (type === 'admin') {
        //                 this.setState({
        //                     user,
        //                 });
        //             }
        //         } catch (error) {
        //             // If the user isn't an admin
        //             console.log(error);
        //         }
        //     } else {
        //         this.setState({
        //             user: null,
        //         });
        //     }
        // });
    }

    render() {
        const { user } = this.state;

        return user ? (
            <div>
                <Router>
                    <Route path="/" component={HomeMenu} />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route
                            path="/registro/estudiante"
                            component={StudentForm}
                        />
                        <Route
                            path="/registro/profesor"
                            component={TeacherForm}
                        />
                        <Route
                            path="/profesores"
                            component={TeacherPanelPage}
                        />
                        <Route
                            path="/estudiantes"
                            component={StudentPanelPage}
                        />
                    </Switch>
                    <Route path="/" component={Footer} />
                </Router>
            </div>
        ) : (
            <LoginPage />
        );
    }

    componentWillUnmount() {
        this.unsuscribeFromAuth();
    }
}

export default App;
