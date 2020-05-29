import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeMenu from './components/menu/menu.component';
import TeacherForm from './components/teacher-form/teacher-form.component';
import StudentForm from './components/student-form/student-form.component';
import TeacherPanelPage from './pages/teacher-panel/teacher-panel.page';
import StudentPanelPage from './pages/student-panel/student-panel.page';
import LandingPage from './pages/landing/landing.page';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <div>
            <Router>
                <Route path="/" component={HomeMenu} />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route
                        path="/registro/estudiante"
                        component={StudentForm}
                    />
                    <Route path="/registro/profesor" component={TeacherForm} />
                    <Route path="/profesores" component={TeacherPanelPage} />
                    <Route path="/estudiantes" component={StudentPanelPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
