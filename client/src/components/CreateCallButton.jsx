import { useCallback } from 'react';
import {
  MemberRequest, useStreamVideoClient
} from '@stream-io/video-react-sdk';
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import hospital from '../assets/hospital.png';
import { meetingId } from './meetingId';

const CreateCallButton = () => {
  const videoClient = useStreamVideoClient();
  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  const createCall = useCallback(() => {
    videoClient?.call('default', meetingId()).getOrCreate({
      ring: true,
      data: {
        custom: {
          channelCid: channel.cid,
        },
        members: Object.values(channel.state.members).reduce(
          (acc, member) => {
            if (member.user_id !== client.user?.id) {
              acc.push({
                user_id: member.user_id,
              });
            }
            return acc;
          },
          [],
        ),
      },
    });
  }, [videoClient, channel.cid, channel.state.members, client.user?.id]);

  const disableCreateCall = !videoClient;
  return (
    <button
      className="rmc__button rmc__button--green"
      disabled={disableCreateCall}
      onClick={createCall}
    >
      <img src={hospital} alt="Create Call" />
    </button>
  );
};

export default CreateCallButton;