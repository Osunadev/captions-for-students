import React, { Component } from 'react';

import { getUser, getSubjects } from '../../firebase/firebase.utils';

class StudentSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            uid: props.match.params.uid,
            subjects: [],
            user: null,
        };
    }

    async componentDidMount() {
        const { uid } = this.state;

        const user = await getUser(uid);
        const { studentId } = user;

        const subjects = await getSubjects(
            'baseSubjects',
            'studentIds',
            studentId
        );

        this.setState({ subjects, user });
    }

    render() {
        const { isLoading, subjects } = this.state;

        return (
            <div style={{ width: '80ww', margin: '0 auto' }}>
                {subjects.map(subject => (
                    <h1>{subject.name}</h1>
                ))}
            </div>
        );
    }
}

export default StudentSubjects;
