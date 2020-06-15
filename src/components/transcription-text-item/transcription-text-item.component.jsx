import React from 'react';

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

const TranscriptionTextItem = ({ type, name, text, dateSent }) => {
    const dateStr = getDateFromTimestamp(dateSent);

    return (
        <List.Item
            size="large"
            style={{
                background: type === 1 ? 'lightgreen' : null,
            }}
        >
            <List.Content>
                {type === 1 && <List.Header>{`Duda de: ${name}`}</List.Header>}
                <List.Description>
                    <p>{text}</p>
                    <span>{dateStr}</span>
                </List.Description>
            </List.Content>
        </List.Item>
    );
};

export default TranscriptionTextItem;
