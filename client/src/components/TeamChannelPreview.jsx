import React from 'react'
import {Avatar,useCharContext} from 'stream-chat-react';

const TeamChannelPreview = (channel,type) => {
    const { channel:activeChannel,cleint} = useCharContext();
     
    const ChannelPreview = ( ) => (
        <p className="channel-preview__item">
            //To make sure we have the channel before we access anything else
            //Or operation used here to see if the channel has the naame or not
            #{channel?.data?.name || channel?.data?.id}   
        </p>
    )

      const DirectPreview = () => {
        //Aceessing each specific user the object
        const members= Object.values(channel.this.state.members).filter(({user}) => user.id !== channel.userID);
      
        return (
            <div className="channel-preview__item single">
                <Avatar
                //? is ternary operator for if comdition
                // ? helps us to check if the user exists 
                image={member[0]?.user?.image}
                name={member[0]?.user?.fullName}
                size={24}
                />
                <p>{members [0]?.user?.fullName}</p>
            </div>
        )
    }
  return (
    <div className= {
        channel?.id === activeChannel ?.id 
         ? 'channel-preview__wrapper__selected'
         :'channel-preview__wrapper'
    }
    onClick={() => {
        console.log('channel');
    }}
    >
    {type === 'team' ?<ChannelPreview/>:<DirectPreview/>}
    </div>
  )
}

export default TeamChannelPreview