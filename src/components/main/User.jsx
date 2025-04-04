import {getAllUsers} from "../../fetchData.js";
import {useContext, useEffect, useState} from "react";
import {UsernameContext,CurrentPageContext} from "../../contexts/context.jsx";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/images/Loading-Animation.json";
import Error from "./Error.jsx";

export default function User() {
    const {defaultUsername} = useContext(UsernameContext);
    const {setActivePage} = useContext(CurrentPageContext);
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isBadRequest, setIsBadRequest] = useState(false);
    useEffect(() => {
        setActivePage("user");
        getAllUsers().then(({data:{users}}) => {
           const matchedUser = users.find((user)=>{
               return  user.username === defaultUsername;
           })
            setName(matchedUser.name)
            setAvatarUrl(matchedUser.avatar_url)
            setLoading(false);
        }).catch((err)=>{
            if(err.status === 404){
                setIsNotFound(true);
            }
            if(err.status === 400){
                setIsBadRequest(true);
            }
        })
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 bg-white">
                <div className="w-[1000px] h-[1000px] mt-[250px] ml-[20px] xl:ml-[650px] md:ml-[250px] lg:ml-[400px]">
                    <Lottie animationData={LoadingAnimation} loop={true} />
                </div>
            </div>
        )
    }

    if(isNotFound){
        return (<Error error={404} />);
    }

    if(isBadRequest){
        return (<Error error={400} />);
    }

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