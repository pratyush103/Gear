//Side bar for the chat application
import React from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import{ChannelSearch,TeamChannelList,TeamChannelPreview} from './';

//Images
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

//for the side bar icon and name
const SideBar= () => {
    return(
    <div className="Channel-list__sidebar">
        <div className="Channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt='Gear' width='30'/>
            </div>
        </div>
        <div className="Channel-list__sidebar__icon2">
            <div className="icon2__inner">
                <img src={LogoutIcon} alt='Gear' width='30'/>
            </div>
        
        </div>
        </div>
        )

}

const CompanyHeader = () => {
    return (
      <div className="channel-list__header">
        <p className="channel-list__header__text">Gear</p>
      </div>
    );
  }
   
const ChannelListContainer =() => {
    return (
        <>
        <SideBar/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader/>
            <ChannelSearch/>
            <ChannelList
            filters={{}}
            channelRenderFilterFn={() => {}}
            //To make a custom team channel list
             List={(listProps) =>(
                <TeamChannelList
                {...listProps}
                type="team"
                />
             )}
             Preview={(previewProps) =>(
                <TeamChannelPreview
                {...previewProps}
                type="team"
                />
             )}
            />
            <ChannelList
            filters={{}}
            channelRenderFilterFn={() => {}}
             List={(listProps) =>(
                <TeamChannelList
                {...listProps}
                type="messaging"
                />
             )}
             Preview={(previewProps) =>(
                <TeamChannelPreview
                {...previewProps}
                type="messaging"
                />
             )}
             />
        </div>
        </>
    );
}
 export default ChannelListContainer;