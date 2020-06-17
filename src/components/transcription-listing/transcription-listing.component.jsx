import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { List, Button } from 'semantic-ui-react';
import TranscriptionTextItem from '../transcription-text-item/transcription-text-item.component';
import { updateSubjectSessionMessages } from '../../firebase/firebase.utils';

class TranscriptionListing extends Component {
    constructor(props) {
        super(props);
        // This state will have all of the modified messages with its id as the key
        this.state = {};
    }

    commitUpdatedMessage = (messageId, text) => {
        this.setState({ [messageId]: text });
    };

    saveMessagesUpdates = async () => {
        const { subjectId, sessionDate, history } = this.props;
        // An object with the following key-value pairs: { 'some-id': 'some-text' }
        const updatedMsgsObj = this.state;

        await updateSubjectSessionMessages(
            subjectId,
            sessionDate,
            updatedMsgsObj
        );
        history.push('/');
    };

    render() {
        const { sessionReviewed, userType, messages } = this.props;

        return (
            <div>
                <List divided relaxed>
                    {messages.map(transcriptionInfo => (
                        <TranscriptionTextItem
                            {...transcriptionInfo}
                            userType={userType}
                            commitUpdatedMessage={this.commitUpdatedMessage}
                            sessionReviewed={sessionReviewed}
                        />
                    ))}
                </List>
                {userType === 'teacher' && (
                    <div style={{ textAlign: 'right' }}>
                        <Button
                            content={
                                sessionReviewed
                                    ? 'Transcripción revisada'
                                    : 'Marcar como revisado'
                            }
                            disabled={sessionReviewed}
                            icon="check"
                            labelPosition="right"
                            style={{
                                background: '#00723F',
                                color: 'white',
                            }}
                            onClick={this.saveMessagesUpdates}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(TranscriptionListing);
