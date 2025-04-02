import {getAllUsers} from "../../fetchData.js";
import {useContext, useEffect, useState} from "react";
import {UsernameContext,CurrentPageContext} from "../../contexts/context.jsx";

export default function User() {
    const {defaultUsername} = useContext(UsernameContext);
    const {setActivePage} = useContext(CurrentPageContext);
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        setActivePage("user");
        getAllUsers().then(({data:{users}}) => {
           const matchedUser = users.find((user)=>{
               return  user.username === defaultUsername;
           })
            setName(matchedUser.name)
            setAvatarUrl(matchedUser.avatar_url)
        })
    }, []);

    return(
        <div className="user-profile flex justify-center items-center mt-28">
            <div className="flex -space-x-1 overflow-hidden p-5 border border-gray-300 rounded-md dark:border-white-200">
                <img className="inline-block size-36 rounded-full ring-2 dark:ring-white ring-black"
                     src={avatarUrl ? avatarUrl : null}
                     alt="user's avatar url"/>
                <div className="profile-wrapper ml-10 font-bold">
                    <p className="name mt-5">Name: {name} </p>
                    <p className="username mt-8">Username: {defaultUsername} </p>
                </div>
            </div>
        </div>
    )
}