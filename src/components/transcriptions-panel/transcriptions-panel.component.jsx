import React, { Component } from 'react';
import { getSubjectTranscriptions } from '../../firebase/firebase.utils';

import { Card, Loader, Header, Icon, Button, Message } from 'semantic-ui-react';
import TranscriptionCard from '../transcription-card/transcription-card.component';
import TranscriptionListing from '../transcription-listing/transcription-listing.component';

const initialState = {
    isLoading: false,
    title: 'Historial de Transcripciones',
    iconName: 'closed captioning',
    captioningDate: '',
    displayTranscription: false,
    displayMessages: undefined,
    displayedSessionReviewed: false,
};

function formatTranscriptionsMsgs(transcriptions) {
    return transcriptions
        .map(sessionTranscription => {
            const messagesKeys = Object.keys(sessionTranscription.messages);
            const messagesArr = messagesKeys.map(msgKey => {
                const msgObj = sessionTranscription.messages[msgKey];
                msgObj['messageId'] = msgKey;
                return msgObj;
            });
            // Sorting from highest to lowest
            messagesArr.sort((a, b) => a.dataSent - b.dataSent);

            sessionTranscription.messages = messagesArr;

            return sessionTranscription;
        })
        .sort((a, b) => b.dateMillis - a.dateMillis);
}

class TranscriptionsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transcriptions: [],
            subjectId: props.match.params.subjectId,
            ...initialState,
        };
    }

    componentDidMount() {
        const { subjectId } = this.state;

        this.setState({ isLoading: true }, async () => {
            const transcriptions = await getSubjectTranscriptions(subjectId);
            const formattedTrans = formatTranscriptionsMsgs(transcriptions);

            this.setState({
                isLoading: false,
                transcriptions: formattedTrans,
            });
        });
    }

    displayTranscription = sessionTranscription => {
        const { date, messages, topic, reviewed } = sessionTranscription;

        this.setState({
            title: `Tema: ${topic}`,
            iconName: 'sticky note',
            captioningDate: date,
            displayMessages: messages,
            displayTranscription: true,
            displayedSessionReviewed: reviewed,
        });
    };

    returnToTranscriptions = () => {
        this.setState({ ...initialState });
    };

    render() {
        const { userType } = this.props;
        const {
            subjectId,
            transcriptions,
            isLoading,
            title,
            iconName,
            captioningDate,
            displayTranscription,
            displayMessages,
            displayedSessionReviewed,
        } = this.state;

        return (
            <div style={{ margin: '0 auto 70px auto', width: '80vw' }}>
                <Header
                    as="h1"
                    style={{
                        margin: '32px 0 32px',
                        fontFamily: 'MinionPro',
                        textAlign: 'center',
                    }}
                >
                    <Header.Content>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {displayTranscription && (
                                <div width="20vw">
                                    <Button
                                        content="Regresar"
                                        icon="left arrow"
                                        labelPosition="left"
                                        onClick={this.returnToTranscriptions}
                                        style={{
                                            height: '42px',
                                        }}
                                    />
                                </div>
                            )}
                            <span
                                style={{
                                    fontFamily: 'ProximaNova',
                                    fontWeight: 'normal',
                                    width: displayTranscription ? '60vw' : null,
                                }}
                            >
                                <h1>
                                    <Icon name={iconName} />
                                    {title}
                                </h1>
                                <h2>{captioningDate}</h2>
                            </span>
                        </div>
                    </Header.Content>
                </Header>
                {isLoading ? (
                    <Loader
                        active
                        inline="centered"
                        size="large"
                        style={{ marginTop: '64px' }}
                    >
                        Cargando...
                    </Loader>
                ) : displayTranscription ? (
                    <TranscriptionListing
                        subjectId={subjectId}
                        sessionDate={captioningDate}
                        sessionReviewed={displayedSessionReviewed}
                        messages={displayMessages}
                        userType={userType}
                    />
                ) : transcriptions.length ? (
                    <Card.Group itemsPerRow={4}>
                        {transcriptions.map(
                            ({ dateMillis, ...sessionTranscription }) => (
                                <TranscriptionCard
                                    key={dateMillis}
                                    transcriptionInfo={sessionTranscription}
                                    displayTranscription={
                                        this.displayTranscription
                                    }
                                />
                            )
                        )}
                    </Card.Group>
                ) : (
                    <Message
                        icon="frown outline"
                        header="No encontramos transcripciones guardadas para esta clase."
                        content="Lo sentimos, al parecer esta clase no cuenta con transcripciones"
                        size="large"
                    />
                )}
            </div>
        );
    }
}

export default TranscriptionsPanel;
