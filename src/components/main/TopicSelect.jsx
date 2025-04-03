import coding from "../../assets/images/coding.png"
import cooking from "../../assets/images/cooking.png"
import football from "../../assets/images/football.png"
import {CurrentPageContext} from "../../contexts/context.jsx";
import {useContext, useEffect} from "react";
import {Link} from "react-router";

export default function TopicSelect () {
    const {setActivePage} = useContext(CurrentPageContext);
    useEffect(() => {
        setActivePage("topics");
    },[])
    return (
        <>
            <div className="title text-center text-4xl font-bold my-8">
                <h1>Select Your Favorite Topic</h1>
            </div>
            <div className="topic-select grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <Link to={"/articles?topic=coding"} className="mx-auto">
                    <div className="coding ml-5 mt-5 ">
                        <img src={coding} className="w-96 rounded-lg" alt="coding topic picture" />
                        <p className="text-4xl text-center mt-5">Coding</p>
                    </div>
                </Link>
                <Link to={"/articles?topic=cooking"} className="mx-auto">
                    <div className="cooking ml-5 mt-5 mx-auto">
                        <img src={cooking} className="w-96 rounded-lg" alt="cooking topic picture" />
                        <p className="text-4xl text-center mt-5">Cooking</p>
                    </div>
                </Link>
                <Link to={"/articles?topic=football"} className="mx-auto">
                    <div className="coding ml-5 mt-5 mx-auto">
                        <img src={football} className="w-96 rounded-lg" alt="football topic picture" />
                        <p className="text-4xl text-center mt-5">Football</p>
                    </div>
                </Link>
            </div>
        </>
    )
}