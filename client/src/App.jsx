import React from 'react';
import {StreamChat} from "stream-chat";
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import{ChannelListContainer,ChannelContainer, Auth} from './components';

import'./App.css';

const apikey ='j29hzwdyr82g' 
const client = StreamChat.getInstance(apikey);

const authToken = false; //Authentication token from login

const App =() => {

    if(!authToken) return <Auth />;

    return (
        
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelContainer
                
                  />

                <ChannelListContainer
                
                   />
            </Chat>
            <h1>Gear</h1>
        </div>
    );
}

export default App;

