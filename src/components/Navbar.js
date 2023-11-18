"use client"
export default function Navbar() {

    return (<div className="flex flex-row w-screen"><div className="navbar bg-base-200 m-2 rounded-md shadow-sm">
        {/* <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Homepage</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>About</a></li>
                </ul>
            </div>
        </div> */}
        <div className="navbar-start">
            <a className="btn btn-ghost text-xl">Galata</a>
        </div>
        <div className="navbar-end">

            <w3m-button></w3m-button>
        </div>
    </div>
    </div>)

}

export function ConnectButton() {
    return <w3m-button />
}