import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState'



const ChannelNameInput =({channelName = '',setChannelName}) =>{


  const handleChange = (event) => {
    event.preventDefault()

    setChannelName(event.target.value)
  
  }

  return(
    <div className="channel-name-input__wrapper">
      <p>Name:</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
      <p>Add Members</p>
    </div>
  )

}

const CreateChannel = ({createType,setIsCreating}) => {

  const [channelName, setChannelName] = useState('')

  const{client, setActiveChannel} = useChatContext()  
  //We set the initial default value to the client id of the user
  const [selectedUsers, setSelectedUsers] = useState([client.userID || '']) 

  const createChannel = async (e) => {
    e.preventDefault()

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      });

      await newChannel.watch()

      setChannelName('')
      setIsCreating(false)
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel)
      const audio = new Audio('https://cdn.whyp.it/10b1aa19-62b1-4f20-bac8-844badc5c03a.mp3');
      audio.play();
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === 'team'? 'Create a New Channel': 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating}/>
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
      <UserList setSelectedUsers = { setSelectedUsers }/>

      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>{createType==='team'? 'Create Channel':'Send Message'}</p>
      </div>
    </div>
  )
}

export default CreateChannel