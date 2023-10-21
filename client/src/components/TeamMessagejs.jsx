import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { areMessageUIPropsEqual, Avatar, EditMessageForm, ErrorIcon, isOnlyEmojis, MESSAGE_ACTIONS, MessageActions, MessageDeleted, MessageInput, MessageRepliesCountButton, MessageStatus, MessageTimestamp, ReactionIcon, ReactionSelector, renderText as defaultRenderText, showMessageActionsBox, SimpleReactionsList, ThreadIcon, useComponentContext, useMessageContext, useReactionClick, useTranslationContext, } from 'stream-chat-react';
import { PinIndicator } from './PinIndicator';
import { useWorkspaceController } from './WorkspaceController';
const MessageTeamWithContext = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const { clearEditingState, editing, getMessageActions, groupStyles, handleAction, handleOpenThread, handleRetry, initialMessage, isReactionEnabled, message, messageWrapperRef, onMentionsClickMessage, onMentionsHoverMessage, onReactionListClick, onUserClick, onUserHover, reactionSelectorRef, renderText = defaultRenderText, showDetailedReactions, threadList, } = props;
    const { Attachment } = useComponentContext('MessageTeam');
    const { t, userLanguage } = useTranslationContext('MessageTeam');
    const messageActions = getMessageActions();
    const showActionsBox = showMessageActionsBox(messageActions);
    const shouldShowReplies = messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && !threadList;
    const messageTextToRender = ((_a = message.i18n) === null || _a === void 0 ? void 0 : _a[`${userLanguage}_text`]) || message.text;
    const messageMentionedUsersItem = message.mentioned_users;
    const messageText = useMemo(() => renderText(messageTextToRender, messageMentionedUsersItem), [
        messageMentionedUsersItem,
        messageTextToRender,
        renderText,
    ]);
    const firstGroupStyle = groupStyles ? groupStyles[0] : 'single';
    if (message.deleted_at) {
        return React.createElement(MessageDeleted, { message: message });
    }
    if (editing) {
        return (React.createElement("div", { className: `str-chat__message-team str-chat__message-team--${firstGroupStyle} str-chat__message-team--editing`, "data-testid": 'message-team-edit' },
            (firstGroupStyle === 'top' || firstGroupStyle === 'single') && (React.createElement("div", { className: 'str-chat__message-team-meta' },
                React.createElement(Avatar, { image: (_b = message.user) === null || _b === void 0 ? void 0 : _b.image, name: ((_c = message.user) === null || _c === void 0 ? void 0 : _c.name) || ((_d = message.user) === null || _d === void 0 ? void 0 : _d.id), onClick: onUserClick, onMouseOver: onUserHover, size: 34 }))),
            React.createElement(MessageInput, { clearEditingState: clearEditingState, Input: EditMessageForm, message: message })));
    }
    const rootClass = clsx('str-chat__message', 'str-chat__message-team', `str-chat__message-team--${firstGroupStyle}`, {
        'pinned-message': message.pinned,
        [`str-chat__message-team--${message.status}`]: message.status,
        [`str-chat__message-team--${message.type}`]: message.type,
        'str-chat__message--has-attachment': !!((_e = message.attachments) === null || _e === void 0 ? void 0 : _e.length),
        'threadList': threadList,
    });
    return (React.createElement(React.Fragment, null,
        message.pinned && React.createElement(PinIndicator, { message: message }),
        React.createElement("div", { className: rootClass, "data-testid": 'message-team', ref: messageWrapperRef },
            React.createElement("div", { className: 'avatar-host' }, firstGroupStyle === 'top' || firstGroupStyle === 'single' || initialMessage ? (React.createElement(Avatar, { image: (_f = message.user) === null || _f === void 0 ? void 0 : _f.image, name: ((_g = message.user) === null || _g === void 0 ? void 0 : _g.name) || ((_h = message.user) === null || _h === void 0 ? void 0 : _h.id), onClick: onUserClick, onMouseOver: onUserHover, size: 34 })) : (React.createElement("div", { "data-testid": 'team-meta-spacer', style: { marginRight: 0, width: 34 } }))),
            React.createElement("div", { className: 'str-chat__message-team-group' },
                (firstGroupStyle === 'top' || firstGroupStyle === 'single' || initialMessage) && (React.createElement("div", { className: 'str-chat__message-team-meta' },
                    React.createElement("div", { className: 'str-chat__message-team-author', "data-testid": 'message-team-author', onClick: onUserClick },
                        React.createElement("strong", null, ((_j = message.user) === null || _j === void 0 ? void 0 : _j.name) || ((_k = message.user) === null || _k === void 0 ? void 0 : _k.id)),
                        message.type === 'error' && (React.createElement("div", { className: 'str-chat__message-team-error-header' }, t('Only visible to you')))),
                    React.createElement(MessageTimestamp, null))),
                React.createElement("div", { className: `str-chat__message-team-content str-chat__message-team-content--${firstGroupStyle} str-chat__message-team-content--${message.text === '' ? 'image' : 'text'}`, "data-testid": 'message-team-content' },
                    !initialMessage &&
                        message.status !== 'sending' &&
                        message.status !== 'failed' &&
                        message.type !== 'system' &&
                        message.type !== 'ephemeral' &&
                        message.type !== 'error' && (React.createElement("div", { className: `str-chat__message-team-actions`, "data-testid": 'message-team-actions' },
                        showDetailedReactions && React.createElement(ReactionSelector, { ref: reactionSelectorRef }),
                        isReactionEnabled && (React.createElement("span", { "data-testid": 'message-team-reaction-icon', onClick: onReactionListClick, title: 'Reactions' },
                            React.createElement(ReactionIcon, null))),
                        shouldShowReplies && (React.createElement("span", { "data-testid": 'message-team-thread-icon', onClick: handleOpenThread, title: 'Start a thread' },
                            React.createElement(ThreadIcon, null))),
                        showActionsBox && (React.createElement(MessageActions, { inline: true, messageWrapperRef: messageWrapperRef })))),
                    message.text && (React.createElement("div", { className: clsx('str-chat__message-team-text', { 'str-chat__message-team-text--is-emoji': isOnlyEmojis(message.text) }), "data-testid": 'message-team-message', onClick: onMentionsClickMessage, onMouseOver: onMentionsHoverMessage }, messageText)),
                    !message.text && ((_l = message.attachments) === null || _l === void 0 ? void 0 : _l.length) ? (React.createElement(Attachment, { actionHandler: handleAction, attachments: message.attachments })) : null,
                    ((_m = message.latest_reactions) === null || _m === void 0 ? void 0 : _m.length) !== 0 && message.text !== '' && isReactionEnabled && (React.createElement(SimpleReactionsList, null)),
                    message.status === 'failed' && (React.createElement("button", { className: 'str-chat__message-team-failed', "data-testid": 'message-team-failed', onClick: message.errorStatusCode !== 403 ? () => handleRetry(message) : undefined },
                        React.createElement(ErrorIcon, null),
                        message.errorStatusCode !== 403
                            ? t('Message Failed · Click to try again')
                            : t('Message Failed · Unauthorized')))),
                React.createElement(MessageStatus, { messageType: 'team' }),
                message.text && ((_o = message.attachments) === null || _o === void 0 ? void 0 : _o.length) ? (React.createElement(Attachment, { actionHandler: handleAction, attachments: message.attachments })) : null,
                message.latest_reactions &&
                    message.latest_reactions.length !== 0 &&
                    message.text === '' &&
                    isReactionEnabled && React.createElement(SimpleReactionsList, null),
                !threadList && (React.createElement(MessageRepliesCountButton, { onClick: handleOpenThread, reply_count: message.reply_count }))))));
};
const MemoizedMessageTeam = React.memo(MessageTeamWithContext, areMessageUIPropsEqual);
export const TeamMessage = (props) => {
    const messageContext = useMessageContext('MessageTeam');
    const { closePinnedMessageListOpen } = useWorkspaceController();
    const reactionSelectorRef = useRef(null);
    const messageWrapperRef = useRef(null);
    const message = props.message || messageContext.message;
    const { isReactionEnabled, onReactionListClick, showDetailedReactions } = useReactionClick(message, reactionSelectorRef, messageWrapperRef);
    const handleOpenThreadOverride = (event) => {
        closePinnedMessageListOpen();
        messageContext.handleOpenThread(event);
    };
    return (React.createElement("div", { className: message.pinned ? 'pinned-message' : 'unpinned-message' },
        React.createElement(MemoizedMessageTeam, Object.assign({}, messageContext, { isReactionEnabled: isReactionEnabled, messageWrapperRef: messageWrapperRef, onReactionListClick: onReactionListClick, reactionSelectorRef: reactionSelectorRef, showDetailedReactions: showDetailedReactions, handleOpenThread: handleOpenThreadOverride }, props))));
};

export default TeamMessage