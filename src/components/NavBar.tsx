import { useContext, useState } from "react"
import { Authcontext, signOut } from "../contexts/AuthContext"
import { FiUser } from 'react-icons/fi'
import { FiChevronDown } from 'react-icons/fi'


function NavBar() {

    const { user } = useContext(Authcontext)


    const [show, setshow] = useState<boolean>(false)

    function handleDropDown() {
        setshow(!show)
    }


    function handleLogout() {
        signOut()
    }
    return (
        <nav className="dark:bg-gray-900 h-full w-full lg:left-0">
            <div className="mx-auto px-2 sm:px-6 lg:px-8">

                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center text-white sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            {/* <span> Bem-vindo(a), {user?.name} </span> */}
                            {/* <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
                            {/* <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
                        </div>

                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="rounded-full bg-gray-800 p-1 text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <FiUser
                                className="h-6 w-6 m-1"
                                aria-hidden="true"
                            />

                        </div>
                        <div className="flex flex-shrink-0 items-center m-2 hover:cursor-pointer hover:text-gray-400" onClick={handleDropDown}>
                            <h3 className="text-white m-1 ">{user?.name} </h3>
                            <FiChevronDown
                                onClick={handleDropDown}
                                className="h-6 w-6 m-1 text-white"
                                aria-hidden="true"
                            />
                        </div>

                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
                                </button>
                            </div>
                            {show ? <div className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <a className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer" role="menuitem" tabIndex={-1} id="user-menu-item-1">Configurações</a>
                                <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sair</a>
                            </div> : null}

                        </div>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default NavBar
