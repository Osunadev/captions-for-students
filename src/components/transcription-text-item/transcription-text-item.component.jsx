import React, { Component } from 'react';

import { List } from 'semantic-ui-react';

function getDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let timeTurnLabel;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (hour < 12) {
        timeTurnLabel = 'am';

        if (hour < 10) {
            hour = '0' + hour;
        }
    } else if (hour === 12) {
        timeTurnLabel = 'pm';
    } else {
        timeTurnLabel = 'pm';
        hour = hour - 12;
    }

    return `${hour}:${minutes} ${timeTurnLabel}`;
}

class TranscriptionTextItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            [props.messageId]: props.text,
        };
    }

    onInputChange = e => {
        const messageId = e.target.name;
        const messageText = e.target.value;

        this.setState({ [messageId]: messageText });

        const { commitUpdatedMessage } = this.props;
        commitUpdatedMessage(messageId, messageText);
    };

    render() {
        const {
            type,
            name,
            dateSent,
            messageId,
            userType,
            sessionReviewed,
        } = this.props;
        const text = this.state[messageId];
        const dateStr = getDateFromTimestamp(dateSent);

        return (
            <List.Item
                size="large"
                style={{
                    background: type === 1 ? 'lightgreen' : null,
                }}
            >
                <List.Content>
                    {type === 1 && (
                        <List.Header>{`Duda de: ${name}`}</List.Header>
                    )}
                    <List.Description>
                        {userType === 'teacher' && type !== 1 ? (
                            <input
                                type="text"
                                style={{
                                    border: 'none',
                                    padding: '8px',
                                    width: '100%',
                                    borderBottom: '1px solid black',
                                }}
                                value={text}
                                name={messageId}
                                onChange={this.onInputChange}
                                disabled={sessionReviewed}
                            />
                        ) : (
                            <p>{text}</p>
                        )}

                        <p>{dateStr}</p>
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
}

export default TranscriptionTextItem;
