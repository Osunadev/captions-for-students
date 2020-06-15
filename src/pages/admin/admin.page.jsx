import React from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import HomeMenu from '../../components/menu/menu.component';
import TeacherForm from '../../components/teacher-form/teacher-form.component';
import StudentForm from '../../components/student-form/student-form.component';
import TeacherPanelPage from '../teacher-panel/teacher-panel.page';
import StudentPanelPage from '../student-panel/student-panel.page';
import SubjectsPage from '../subjects/subjects.page';
import LandingPage from '../landing/landing.page';
import Footer from '../../components/footer/footer.component';

const AdminPage = ({ email, pass }) => {
    return (
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
                    <Route path="/profesores" component={TeacherPanelPage} />
                    <Route path="/estudiantes" component={StudentPanelPage} />
                    <Route path="/asignaturas" component={SubjectsPage} />
                </Switch>
                <Route path="/" component={Footer} />
            </Router>
        </div>
    );
};

export default AdminPage;
