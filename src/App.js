import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

import { auth, getUser } from './firebase/firebase.utils';
import LoginPage from './pages/login/login.page';
import AdminPage from './pages/admin/admin.page';
import StudentPage from './pages/student/student.page';

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
                    const userInfo = await getUser(uid);
                    this.setState({
                        user: userInfo,
                        type: userInfo.type,
                    });
                } catch (error) {
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
        const { user, type, email, pass } = this.state;

        return user ? (
            {
                admin: <AdminPage email={email} pass={pass} />,
                student: <StudentPage user={user} />,
            }[type]
        ) : (
            <LoginPage setCredentials={this.setCredentials} />
        );
    }

    componentWillUnmount() {
        this.unsuscribeFromAuth();
    }
}

export default App;
