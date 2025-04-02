import {Link} from "react-router";
import {CurrentPageContext} from "../../contexts/context.jsx";
import {useContext, useEffect} from "react";

export default function Header() {
    const {activePage} = useContext(CurrentPageContext);
    useEffect(() => {
    }, [activePage]);
    return (
        <header className="App-header flex flex-row items-center font-bold p-4">
            <div className="northcoders-logo">
                <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 150 L100 50 L150 150" stroke="red" strokeWidth="20" fill="none" strokeLinecap="square" />
                </svg>
            </div>
            <div className="text-4xl ms-3">Northcoders News</div>

            <nav className="bg-white">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <Link to={"/"}>
                                <div className={`rounded-md ${activePage==='home' ? "bg-gray-900 text-white" : "text-gray-500"} px-3 py-2 text-sm font-medium`} aria-current="page">Home</div>
                            </Link>
                            <Link to={"/topics"}>
                                <div className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white">Topics</div>
                            </Link>
                            <Link to={"/my-comments"}>
                                <div className={`rounded-md px-3 py-2 text-sm font-medium ${activePage==='my comments' ? "bg-gray-900 text-white" : "text-gray-500"} hover:bg-gray-700 hover:text-white`}>My Comments</div>
                            </Link>
                            <Link to={"/user"}>
                                <div className={`rounded-md ${activePage==='user' ? "bg-gray-900 text-white" : "text-gray-500"} px-3 py-2 text-sm font-medium  hover:bg-gray-700 hover:text-white`}>User</div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white">Topic</a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white">Comments</a>
                        <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white">User</a>
                    </div>
                </div>
            </nav>

        </header>
    )
}