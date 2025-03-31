export default function Header() {
    return (
        <header className="App-header flex flex-row items-center font-bold p-4">
            <div className="northcoders-logo">
                <svg width="100" height="100" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 150 L100 50 L150 150" stroke="red" strokeWidth="20" fill="none" strokeLinecap="square" />
                </svg>
            </div>
            <div className="text-4xl ms-3">Northcoders News</div>
            <menu>
                <div className="menu-log md:hidden" onClick={() => {

                }}>
                    <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="20" width="80" height="10" fill="black"/>
                        <rect x="10" y="45" width="80" height="10" fill="black"/>
                        <rect x="10" y="70" width="80" height="10" fill="black"/>
                    </svg>
                </div>
            </menu>
            <nav className="flex flex-wrap">

            </nav>
        </header>
    )
}