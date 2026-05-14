import { StreamCall, useCalls } from '@stream-io/video-react-sdk';

import {
  CallingState,
  CancelCallButton,
  PaginatedGridLayout,
  RingingCall,
  ScreenShareButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useChatContext } from 'stream-chat-react';
import { useState } from 'react';
import { useDraggable } from './';

const CallPanel = () => {
  const call = useCall();
  const { useCallCallingState, useCallCustomData } = useCallStateHooks();
  const callingState = useCallCallingState();
  const customData = useCallCustomData();
  const { channel: activeChannel } = useChatContext();
  const [panelElement, setPanelElement] = useState(null);;
  useDraggable(panelElement);

  if (!call) return null;

  const callingToActiveChannel = activeChannel?.cid === customData.channelCid;
  if (CallingState.RINGING === callingState && !callingToActiveChannel)
    return null;

  if (callingState === CallingState.JOINED) {
    return (
      <div
        className="str-video__call-panel rmc__call-panel-wrapper"
        ref={setPanelElement}
      >
        <PaginatedGridLayout groupSize={4} />
        <div className="rmc__active-call-controls">
          <ScreenShareButton />
          <SpeakingWhileMutedNotification>
            <ToggleAudioPublishingButton />
          </SpeakingWhileMutedNotification>
          <ToggleVideoPublishingButton />
          <CancelCallButton />
        </div>
      </div>
    );
  } else if (
    [CallingState.RINGING, CallingState.JOINING].includes(callingState)
  ) {
    return (
      <div className="rmc__call-panel-wrapper" ref={setPanelElement}>
        <RingingCall />
      </div>
    );
  }

  return null;
};

const Video = () => {
  const calls = useCalls();
  return (
    <>
      {calls.map((call) => (
        <StreamCall call={call} key={call.cid}>
          <CallPanel />
        </StreamCall>
      ))}
    </>
  );
};

export default Video;
