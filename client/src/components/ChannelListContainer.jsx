//Side bar for the chat application
import { React,useState } from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import{ChannelSearch,TeamChannelList,TeamChannelPreview} from './';

//Images
import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logoutico.png'

const cookies = new Cookies();

//for the side bar icon and name
const SideBar= ({logout}) => {
    return(
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt='Gear' width='30'/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon2__inner" onClick={ logout }>
                <img src={LogoutIcon} alt='Gear' width='30'/>
            </div>
        
        </div>
        </div>
        )

}

const CompanyHeader = () => {
    return (
        <div className="channel-list__header">
  <ul className="channel-list__header__ul">
    <li className="channel-list__header__li" style={{'--clr': '#04d9ff'}}>
      <h2>
        <a href="#" className="channel-list__header__a" data-text=" Gear">
           Gear </a></h2>
    </li>
    </ul>
    </div>

    );
  }

  const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
  }

  const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
  }

  
const ChannelListContent =({isCreating,setIsCreating,setCreateType, setIsEditing, setToggleContainer}) => {
    const {client} = useChatContext()

    

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader/>
            <ChannelSearch
                setToggleContainer={setToggleContainer}
            />
            <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelTeamFilter}
            //To make a custom team channel list
             List={(listProps) =>(
                <TeamChannelList
                {...listProps}
                type="team"
                isCreating={isCreating}
                setIsCreating={setIsCreating}

                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                />
             )}
             Preview={(previewProps) =>(
                <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="team"
                />
             )}
            />
            <ChannelList
            filters={filters}
            channelRenderFilterFn={customChannelMessagingFilter}
             List={(listProps) =>(
                <TeamChannelList
                {...listProps}
                type="messaging"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                />
             )}
             Preview={(previewProps) =>(
                <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="messaging"
                />
             )}
             />
        </div>
        </>
    );
}

const ChannelListContainer = ({setCreateType,setIsCreating,setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return(
        <>
            
            <div className="channel-list__container">
                <ChannelListContent                
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                
                />

            </div>
            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? '0%' : '-89%', backgroundColor : "var(--primary)"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer)=>!prevToggleContainer)}>


                </div>
                
                    <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    />
                
                
            </div>

        </>

    )
}

 export default ChannelListContainer;