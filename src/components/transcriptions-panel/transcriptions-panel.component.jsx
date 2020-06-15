import React, { Component } from 'react';
import { getSubjectTranscriptions } from '../../firebase/firebase.utils';

import {
    Card,
    Loader,
    Header,
    Icon,
    Button,
    Message,
    List,
} from 'semantic-ui-react';
import TranscriptionCard from '../transcription-card/transcription-card.component';
import TranscriptionTextItem from '../transcription-text-item/transcription-text-item.component';

const initialState = {
    isLoading: false,
    title: 'Historial de Transcripciones',
    iconName: 'closed captioning',
    captioningDate: '',
    displayTranscription: false,
    displayMessages: undefined,
};

function formatTranscriptionsMsgs(transcriptions) {
    return transcriptions
        .map(transcriptionInfo => {
            const messagesArr = Object.values(transcriptionInfo.messages);
            // Sorting from highest to lowest
            messagesArr.sort((a, b) => a.dataSent - b.dataSent);

            transcriptionInfo.messages = messagesArr;

            return transcriptionInfo;
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

            console.log(formattedTrans);
            this.setState({
                isLoading: false,
                transcriptions: formattedTrans,
            });
        });
    }

    displayTranscription = transcriptionInfo => {
        const { date, messages, topic } = transcriptionInfo;

        this.setState({
            title: `Tema: ${topic}`,
            iconName: 'sticky note',
            captioningDate: date,
            displayMessages: messages,
            displayTranscription: true,
        });
    };

    returnToTranscriptions = () => {
        this.setState({ ...initialState });
    };

    render() {
        const {
            transcriptions,
            isLoading,
            title,
            iconName,
            captioningDate,
            displayTranscription,
            displayMessages,
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
                        id="fonts"
                        style={{ marginTop: '64px' }}
                    >
                        Cargando...
                    </Loader>
                ) : displayTranscription ? (
                    <List divided relaxed>
                        {displayMessages.map(transcriptionInfo => (
                            <TranscriptionTextItem {...transcriptionInfo} />
                        ))}
                    </List>
                ) : transcriptions.length ? (
                    <Card.Group itemsPerRow={4}>
                        {transcriptions.map(
                            ({ dateMillis, ...transcriptionInfo }) => (
                                <TranscriptionCard
                                    key={dateMillis}
                                    transcriptionInfo={transcriptionInfo}
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
