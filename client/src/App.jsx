import React, {useState , useEffect} from 'react';
import {StreamChat} from "stream-chat";
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import{ChannelListContainer,ChannelContainer, Auth} from './components';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';

import 'stream-chat-react/dist/css/index.css';
import'./App.css';
import EntrySound from './assets/notification.mp3';


//import'./Signin-up.css';

const cookies = new Cookies();

const apiKey ='bs9t8whf3d2j' 

const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

// possible state errors fix: https://youtu.be/MJzbJQLGehs?si=RTc-hWf-jcwo7T9u&t=6700

const App =() => {
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    
    useEffect(() => {
        if (authToken) {
            const audio = new Audio('https://cdn.whyp.it/2928b992-5f43-4878-a8f7-0162adac3cef.mp3');
            audio.play();
        }
    }, []);

    useEffect(() => {
        const audio = new Audio('https://cdn.whyp.it/6cf15bb4-fb67-4e58-a7dd-c85665bc916b.mp3');
        let originalTitle = document.title;
    
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.target === document.querySelector('title')) {
              const newTitle = mutation.target.textContent;
              if (newTitle !== originalTitle) {
                audio.play();
                originalTitle = newTitle;
              }
              
            }
          });
        });
    
        observer.observe(document.querySelector('title'), { childList: true });
    
        return () => {
          observer.disconnect();
        };
      }, []);

    if(!authToken) return <Auth />;

    return (
        
        <div className="app__wrapper">
            <Chat client={client} theme="team dark">
                
            <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}

                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                
                   />

                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                
                  />
                
                
            </Chat>
        </div>
    );
}

export default App;

