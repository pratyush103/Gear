import React, {useEffect,useState} from "react";
import { Avatar, useChatChannel, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets";

const ListContainer = ({ children }) => {
    return(
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem =({ user,setSelectedUsers }) =>{
    const [selected, setSelected] = useState(false)
    const handleSelect = () => {
        if(selected){
            setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.filter((prevUser) => prevUser !== user.id))
        
        }
        else{
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected) //toggle between if selected or not
    }
    return(
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected? <InviteIcon />: <div className="user-item__invite-empty"/>}
            
            

        </div>
    )

}
// id: {$ne: client.userID}  is fetching all users except the current user
// limits users fetched to 8
const UserList = ({ setSelectedUsers }) => {
    const { client }= useChatContext();
    
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState(false)

    //error handling
    const [error, setError] = useState(false);
    
    useEffect(() => {
      const getUsers = async () => {
        if(loading) return;
        setLoading(true);
        try {
            const response = await client.queryUsers(
                {id: {$ne: client.userID}},
                {id: 1},
                {limit: 20}
            )
            if(response.users){
                setUsers(response.users);
            
            }
            else{
                setListEmpty(true)
            }
                
            
        } catch (error) {
            console.log(error);
            setError(true);
        
            
        }
        setLoading(false);
      }
      if(client) getUsers()
    }, [])

    if(error){
        return (
            <ListContainer>
            <div className="user-list__message">
                Connection Error,please wait a moment and try again.
            </div>
            </ListContainer>
        )
    }

    if(listEmpty){
        return (
            <ListContainer>
            <div className="user-list__message">
                No Users to show Here
            </div>
            </ListContainer>
        )
    }
    
  return (
    <ListContainer>
        {loading ? <div className="user-list__message">
            Loading Users...
        </div> : ( 
            users ?.map((user, i)=>(
            <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>))
        )}
    </ListContainer>
    
  )
}

export default UserList