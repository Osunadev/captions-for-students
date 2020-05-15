import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeMenu from './components/menu/menu.component';
import TeacherForm from './components/teacher-form/teacher-form.component';
import StudentForm from './components/student-form/student-form.component';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <div>
            <Router>
                <Route path="/" component={HomeMenu} />
                <Switch>
                    <Route
                        path="/registro/estudiante"
                        component={StudentForm}
                    />
                    <Route path="/registro/profesor" component={TeacherForm} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
