import React,{useState,useEffect}from 'react';
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './';

//Images
import {SearchIcon} from '../assets';

const ChannelSearch =({setToggleContainer}) => {
    const {client, setActiveChannel} = useChatContext();
    const [query,setQuery] = useState('');
    const [loading,setLoading] = useState('false');//At start our loading will be set to false
    const [teamChannels,setTeamChannels] = useState([]);//At start our team channels will be set to empty array
    const [directChannels,setDirectChannels] = useState([]);//At start our direct channels will be set to empty array
    
    useEffect(() => { 
        if (!query) { 
            setTeamChannels([]); 
            setDirectChannels([]); 
        } }, [query])

    const getChannels = async (text) => {    
        //using async function as we have to wait the channel to be fetched..
        //using try and catch here to find the channel or it will return an error..
        try{
            const channelResponse =  client.queryChannels({
                type: 'team', 
                name: {$autocomplete: text}, 
                members : {$in: [client.userID]}
            
            })
            const userResponse =  client.queryUsers({
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            })

            const [channels,users] = await Promise.all([channelResponse,userResponse]);
            if(channels.length) setTeamChannels(channels);
            if(users.length) setDirectChannels(users);
            
            
            
           } 
        catch(error){
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

    const setChannel = (channel) => {
        setQuery('');
        setActiveChannel(channel);
                
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
            { query && (
                <ResultsDropdown 
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setQuery={setQuery}
                    setChannel={setChannel}
                    setToggleContainer={setToggleContainer}
                />
            )

            }
        </div>
    )
}
 
export default ChannelSearch;