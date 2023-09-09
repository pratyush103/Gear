//Side bar for the chat application
import React from 'react';
import {Channellist, useCharContext} from 'stream-chat';
import Cookies from 'universal-cookie';
import{ChannelSearch,TeamChannelList,TeamChannelPreview} from './';
import HospitalIcon from '../assets/hospital.png'

const SideBar= () => (
    <div className="Channel-list__sidebar">
        <div className="Channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src= {HospitalIcon} alt="Hospital" width="30"/>
            </div>

        </div>

    </div>
)
const ChannelListContainer =() => {
    return (
        <div>ChannelListContainer

        </div>
    );
}
 export default ChannelListContainer;