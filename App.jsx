import React from 'react';
import {StreamChat} from "stream-chat";
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookies';
import{ChannellistContainer,ChannelContainer} from './components';
import'./App.css';
const apikey =' ' //api key goes here
const client = StreamChat.getInstance(apikey);
const App =() => {
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannellistContainer
                
                  />

                <ChannellistContainer
                
                   />
            </Chat>
            <h1>Medical Pager Chat App</h1>
        </div>
    );
}

export default App;

