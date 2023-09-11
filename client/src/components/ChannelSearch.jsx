import React,{useState,useEffect}from 'react';
import { useChatContext } from 'stream-chat-react';

import {SearchIcon} from '../assets';

const ChannelSearch =() => {
    const [query,setQuery] = useState('');
    const [loading,setLoading] = useState('false');//At start our loading will be set to false
     
    const getChannels = async (text) => {    
        //using async function as we have to wait the channel to be fetched..
        //using try and catch here to find the channel or it will return an error..
        try{
            //To fetch channels
           } catch(error){
            setQuery('')
        }
    };

    const onSearch = (event) => {
        //need to apply this venry time when we have buttons as the usual browser behaviour is not instantaneous and we are using react 
        //so we use this to keep the page smooth on refresh
        event.preventDefault();    
       setLoading(true);
       setQuery(event.target.value);
       getChannels(event.target.value);
    }
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon/>
                </div>
                < input className="channel-search__input__text" 
                placeholder="Search" 
                type="text" 
                value={query}
                onChange={onSearch}
                
                />
            </div>

        </div>
    )
}
 
export default ChannelSearch;