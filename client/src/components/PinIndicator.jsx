import React from 'react';
import { PinIcon } from '../assets';
export const PinIndicator = ({ message }) => {
    var _a, _b;
    if (!message)
        return null;
    return (React.createElement("div", { className: 'str-chat__message-team-pin-indicator' },
        React.createElement(PinIcon, null),
        message.pinned_by
            ? `Pinned by ${((_a = message.pinned_by) === null || _a === void 0 ? void 0 : _a.name) || ((_b = message.pinned_by) === null || _b === void 0 ? void 0 : _b.id)}`
            : 'Message pinned'));
};

export default PinIndicator