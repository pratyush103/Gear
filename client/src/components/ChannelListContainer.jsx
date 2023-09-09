//Side bar for the chat application
import React from 'react';
import {ChannelList, useCharContext} from 'stream-chat';
import Cookies from 'universal-cookie';
import{ChannelSearch,TeamChannelList,TeamChannelPreview} from './';
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

//for the side bar icon and name
const SideBar= () => (
    <div className="Channel-list__sidebar">
        <div className="Channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src= {HospitalIcon} alt="Hospital" width="30"/>
            </div>
            </div>
            <div className="Channel-list__sidebar__icon2">
            <div className="icon1__inner">
                <img src= {LogoutIcon} alt="Logout" width="30"/>
            </div>
            </div>
    </div>
);
const CompanyHeader =() =>{
    <div className="channel-list__header">
        <p className="channel-list__header__text">YOU TITLE GOES HERE</p>

    </div>
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
            />
        </div>
        </>
    );
}
 export default ChannelListContainer;