import { useContext, useState } from "react"
import { Authcontext, signOut } from "../contexts/AuthContext"
import { FiUser } from 'react-icons/fi'
import { FiChevronDown } from 'react-icons/fi'
import Link from "next/link"


function NavBar() {

    const { user } = useContext(Authcontext)


    const [show, setshow] = useState<boolean>(false)

    function handleDropDown() {
        setshow(!show)
    }

    function closeDropDown() {
        setshow(false)
    }

    function handleLogout() {
        handleDropDown()
        signOut()
    }

    return (
        <nav className="bg-gray-900 p-2 mt-0 fixed w-full z-10 top-0 h-16">
            <div className="container mx-auto flex flex-wrap items-center">
                <div className="flex w-full md:w-1/2 justify-center md:justify-end text-white font-extrabold">

                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 ">
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
                            <Link href="/painel/settings" role="menuitem" tabIndex={-1} id="user-menu-item-1"><p className="m-3 font-bold hover:cursor-pointer">Minha Conta</p></Link>
                            <a onClick={handleLogout} className="block text-sm text-gray-700 hover:cursor-pointer" role="menuitem" tabIndex={-1} id="user-menu-item-2"><p className="m-3">Sair</p></a>
                        </div> : null}

                    </div>
                </div>
            </div>
        </nav>
        // <nav className="dark:bg-gray-900p-2 mt-0 fixed w-full z-10 top-0">
        //     <div className="container mx-auto flex flex-wrap items-center">
        //         <div className="relative flex h-16 items-center justify-between">
        //             <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        //                 <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
        //                     <span className="sr-only">Open main menu</span>

        //                     <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        //                     </svg>

        //                     <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        //                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="flex flex-1 items-center justify-center text-white sm:items-stretch sm:justify-start">
        //                 <div className="flex flex-shrink-0 items-center">
        //                     {/* <span> Bem-vindo(a), {user?.name} </span> */}
        //                     {/* <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
        //                     {/* <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
        //                 </div>

        //             </div>
        // <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        //     <div className="rounded-full bg-gray-800 p-1 text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        //         <FiUser
        //             className="h-6 w-6 m-1"
        //             aria-hidden="true"
        //         />

        //     </div>
        //     <div className="flex flex-shrink-0 items-center m-2 hover:cursor-pointer hover:text-gray-400" onClick={handleDropDown}>
        //         <h3 className="text-white m-1 ">{user?.name} </h3>
        //         <FiChevronDown
        //             onClick={handleDropDown}
        //             className="h-6 w-6 m-1 text-white"
        //             aria-hidden="true"
        //         />
        //     </div>

        //     <div className="relative ml-3">
        //         <div>
        //             <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
        //                 <span className="sr-only">Open user menu</span>
        //                 {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""> */}
        //             </button>
        //         </div>
        //         {show ? <div className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
        //             <a className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer" role="menuitem" tabIndex={-1} id="user-menu-item-1">Configurações</a>
        //             <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sair</a>
        //         </div> : null}

        //     </div>
        // </div>
        //         </div>
        //     </div>

        // </nav>

        //         <>
        //         <div class="flex flex-wrap place-items-center h-screen">
        //   <section class="relative mx-auto">
        //     <nav class="flex justify-between bg-gray-900 text-white w-screen">
        //       <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        //         {/* <a class="text-3xl font-bold font-heading" href="#">
        //           Logo Here.
        //         </a> */}
        //         <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
        //           <li><a class="hover:text-gray-200" href="#">Home</a></li>
        //           <li><a class="hover:text-gray-200" href="#">Catagory</a></li>
        //           <li><a class="hover:text-gray-200" href="#">Collections</a></li>
        //           <li><a class="hover:text-gray-200" href="#">Contact Us</a></li>
        //         </ul>
        //         <div class="hidden xl:flex items-center space-x-5 items-center">
        //           <a class="hover:text-gray-200" href="#">
        //             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        //             </svg>
        //           </a>
        //           <a class="flex items-center hover:text-gray-200" href="#">
        //               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        //               </svg>
        //             <span class="flex absolute -mt-5 ml-4">
        //               <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
        //                 <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
        //                 </span>
        //               </span>
        //           </a>
        //           <a class="flex items-center hover:text-gray-200" href="#">
        //               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        //               </svg>
        //           </a>

        //         </div>
        //       </div>
        //       <a class="xl:hidden flex mr-6 items-center" href="#">
        //         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        //         </svg>
        //         <span class="flex absolute -mt-5 ml-4">
        //           <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
        //           <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
        //           </span>
        //         </span>
        //       </a>
        //       <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
        //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        //           </svg>
        //       </a>
        //     </nav>

        //   </section>
        // </div>
        // <div class="absolute bottom-0 right-0 mb-4 mr-4 z-10">
        //     <div>
        //         <a title="Follow me on twitter" href="https://www.twitter.com/asad_codes" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
        //             <img class="object-cover object-center w-full h-full rounded-full" src="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2019/12/twitter-logo.jpg"/>
        //         </a>
        //     </div>
        // </div>

        //         </>
    )
}

export default NavBar
