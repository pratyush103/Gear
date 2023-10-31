//Side bar for the chat application
import { React,useState } from 'react';
import {ChannelList, useChatContext} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import{ChannelSearch,TeamChannelList,TeamChannelPreview} from './';

//Images

import LogoutIcon from '../assets/logoutico.png'


const cookies = new Cookies();

//for the side bar icon and name
const SideBar= ({logout}) => {
    return(
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                {/*<img src={HospitalIcon} alt='Gear' width='30'/>*/}                
                <a href='#' className='channel-list__sidebar__icon1__a'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 128 128"
                    className="logoMain"
                    >
                    <path d="M37.26 99.014c-3.938.151-7.777-.624-9.239-8.482-1.212-6.513 10.3-26.355 10.3-26.355-2.423-2.878-5.453-18.933-5.453-18.933-3.938-1.06-22.568.454-22.568.454 2.423-3.332 22.72-4.544 22.72-4.544-.454-9.239 3.181-16.055 6.362-16.51 3.181-.454 7.725 5.15 7.725 5.15-.454-2.272.303-20.145 10.3-19.842s21.962 23.629 21.962 23.629c4.544-.454 19.387 4.695 19.387 4.695 3.484-1.818 10.148-19.993 10.148-19.993 2.121 5.604-7.422 21.811-7.422 21.811 4.544 2.575 10.905 7.422 11.966 12.572 1.06 5.15-8.633 5.604-8.633 5.604 3.635 2.423 12.269 7.27 12.875 15.752.751 10.513-32.565 10.451-32.565 10.451-.909 3.181-13.935 14.541-13.935 14.541.757 2.878 12.723 18.933 12.723 18.933-3.787 1.666-15.904-17.267-15.904-17.267-6.816 4.392-13.935 5.15-16.813 2.878s.303-9.391.303-9.391c-.607 1.06-10.301 4.696-14.239 4.847zm51.296-48.772c-1.717-4.847-7.472-9.189-7.472-9.189 5.655.808 9.997 8.684 9.997 8.684l3.837-6.059c-21.407-13.026-40.29-2.928-40.29-2.928-1.212 8.785 7.169 36.352 7.169 36.352l-4.443 1.818c-3.13-3.433-9.189-31.404-9.189-31.404-3.13 3.534-4.342 11.511-4.342 11.511-2.221-6.16 2.423-13.228 2.423-13.228l-7.068-.303C41.501 73.265 56.85 81.949 56.85 81.949c9.997-3.837 27.567-24.133 27.567-24.133l3.938 2.827c-1.515 3.938-22.518 23.83-22.518 23.83 2.423.707 12.42-1.818 12.42-1.818-1.919 3.433-12.824 3.635-12.824 3.635l3.484 7.195C92.696 76.143 91.03 59.179 91.03 59.179c-12.041-7.346-34.458-11.587-34.458-11.587l-.076-5.377c10.754-.455 32.06 8.027 32.06 8.027zm-41.299-8.633l-.151-6.967s-2.726-2.726-3.787-3.029-4.544 1.969-4.544 10.148l8.482-.152zm8.179 54.982c4.998 2.726 10.3-1.06 10.3-1.06l-4.241-7.725c-3.181 1.363-11.057 6.058-6.059 8.785zM53.77 83.565s-10.148-7.27-12.875-14.238c0 0-6.059 11.057-3.181 15.904s14.39.151 16.056-1.666zm49.832-9.997c1.969-3.787-9.088-12.723-9.088-12.723 0 9.088-6.513 18.479-6.513 18.479 6.664.757 13.632-1.969 15.601-5.756zm1.06-19.236c2.121-3.181-6.059-8.936-6.059-8.936l-4.241 7.119c3.939 1.817 8.18 4.998 10.3 1.817zm-31.05-21.205s-7.573-10.905-11.663-10.905-7.725 11.814-7.119 15.298c0-.001 8.634-5.453 18.782-4.393z"
                    fill="none"
                    ></path>
                </svg>
                </a>
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
    <li className="channel-list__header__li" style={{'--clr': '#39ff14'}}>
      <h2>
        <a href="https://gear.my.canva.site/#page-3" className="channel-list__header__a" data-text="Nexus">
          Nexus</a></h2>
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