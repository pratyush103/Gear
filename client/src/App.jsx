import React from 'react'
import { StreamChat } from 'stream-chat';
import { Channel, Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

const apiKey = 'j29hzwdyr82g';

const App = () => {
    
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team dark'>
        <ChannelListContainer 
        
        />
        <ChannelContainer 
        
        />
      </Chat>
      
    </div>>
  )
}

export default App