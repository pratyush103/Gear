import React, { useCallback, useContext, useState } from 'react';
const noop = () => Promise.resolve();
const WorkspaceControllerContext = React.createContext({
    activeWorkspace: 'Chat',
    closeAdminPanel: noop,
    displayWorkspace: noop,
    pinnedMessageListOpen: false,
    togglePinnedMessageListOpen: noop,
    closePinnedMessageListOpen: noop,
});
export const WorkspaceController = ({ children }) => {
    const [activeWorkspace, setActiveWorkspace] = useState('Chat');
    const [pinnedMessageListOpen, setPinnedMessageListOpen] = useState(false);
    const displayWorkspace = useCallback((workspace) => {
        setActiveWorkspace(workspace);
        setPinnedMessageListOpen(false);
    }, [setActiveWorkspace]);
    const closeAdminPanel = useCallback(() => {
        displayWorkspace('Chat');
    }, [displayWorkspace]);
    const togglePinnedMessageListOpen = useCallback(() => setPinnedMessageListOpen((prev) => !prev), []);
    const closePinnedMessageListOpen = useCallback(() => setPinnedMessageListOpen(false), []);
    return (React.createElement(WorkspaceControllerContext.Provider, { value: {
            activeWorkspace,
            closeAdminPanel,
            displayWorkspace,
            pinnedMessageListOpen,
            closePinnedMessageListOpen,
            togglePinnedMessageListOpen,
        } }, children));
};
export const useWorkspaceController = () => useContext(WorkspaceControllerContext);

export default WorkspaceController