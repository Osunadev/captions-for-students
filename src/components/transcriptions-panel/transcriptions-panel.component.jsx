import React, { Component } from 'react';
import { getSubjectTranscriptions } from '../../firebase/firebase.utils';

class TranscriptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transcriptions: [],
            isLoading: false,
            subjectId: props.match.params.subjectId,
        };
    }

    componentDidMount() {
        const { subjectId } = this.state;

        this.setState({ isLoading: true }, async () => {
            const transcriptions = await getSubjectTranscriptions(subjectId);

            console.log(transcriptions);
            this.setState({ isLoading: false, transcriptions });
        });
    }

    render() {
        return <div>Transcriptions Panel</div>;
    }
}

export default TranscriptionsPanel;
