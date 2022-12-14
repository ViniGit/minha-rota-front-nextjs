import { Disclosure } from "@headlessui/react"
import { GiCityCar, GiPathDistance, GiTakeMyMoney } from 'react-icons/gi'
import {
    MdOutlineSpaceDashboard,
} from "react-icons/md"
import { TbReportAnalytics } from "react-icons/tb"
import { FaMapMarkedAlt } from "react-icons/fa"
import { Authcontext } from "../contexts/AuthContext"
import Link from "next/link"
import { useContext } from "react"
import { useRouter } from "next/router"


function MyApp() {
    const { signOut } = useContext(Authcontext)

    const router = useRouter()

    function handleLogout() {
        signOut()
    }

    return (
        <div>
            <Disclosure as="nav">
                {/* <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-400 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu
                        className="block h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button> */}
                <div className="p-6 w-1/2 h-screen bg-gray-900 dark:bg-gray-900 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                        <Link href="/painel/dashboard">
                            <h1 className="text-base text-center cursor-pointer font-bold text-red-500 border-b border-gray-100 pb-4 w-full">
                                Minha Rota
                            </h1>
                        </Link>
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            <Link href="/painel/dashboard">
                                <div className={router.pathname == '/painel/dashboard' ? "flex mb-2 justify-start items-center gap-4 pl-5 bg-gray-800 p-2 rounded-md group cursor-pointer shadow-lg m-auto" : "flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"}>
                                    <MdOutlineSpaceDashboard className={router.pathname == '/painel/dashboard' ? "text-2xl text-red-500 " : "text-2xl text-white group-hover:text-red-500 "} />
                                    <h3 className={router.pathname == '/painel/dashboard' ? "text-base text-red-500 font-semibold " : "text-base text-white group-hover:text-red-500 font-semibold "}>
                                        Dashboard
                                    </h3>
                                </div>
                            </Link>

                            <Link href="/painel/route">
                                <div className={router.pathname == '/painel/route' ? "flex  mb-2 justify-start items-center gap-4 pl-5 bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" : "flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"}>
                                    <GiPathDistance className={router.pathname == '/painel/route' ? "text-2xl text-red-500 " : "text-2xl text-white group-hover:text-red-500 "} />
                                    <h3 className={router.pathname == '/painel/route' ? "text-base text-red-500 font-semibold " : "text-base text-white group-hover:text-red-500 font-semibold "}>
                                        Trajetos
                                    </h3>
                                </div>
                            </Link>

                            <Link href="/painel/vehicle">
                                <div className={router.pathname == '/painel/vehicle' ? "flex mb-2 justify-start items-center gap-4 pl-5 bg-gray-800 p-2 rounded-md group cursor-pointer shadow-lg m-auto" : "flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"}>
                                    <GiCityCar className={router.pathname == '/painel/vehicle' ? "text-2xl text-red-500 " : "text-2xl text-white group-hover:text-red-500 "} />
                                    <h3 className={router.pathname == '/painel/vehicle' ? "text-base text-red-500 font-semibold " : "text-base text-white group-hover:text-red-500 font-semibold "}>
                                        Ve??culos
                                    </h3>
                                </div>
                            </Link>

                            <Link href="/painel/expense">
                                <div className={router.pathname == '/painel/expense' ? "flex mb-2 justify-start items-center gap-4 pl-5 bg-gray-800 p-2 rounded-md group cursor-pointer shadow-lg m-auto" : "flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"}>
                                    <GiTakeMyMoney className={router.pathname == '/painel/expense' ? "text-2xl text-red-500 " : "text-2xl text-white group-hover:text-red-500 "} />
                                    <h3 className={router.pathname == '/painel/expense' ? "text-base text-red-500 font-semibold " : "text-base text-white group-hover:text-red-500 font-semibold "}>
                                        Despesas
                                    </h3>
                                </div>
                            </Link>

                            <Link href="/painel/travel">
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <FaMapMarkedAlt className="text-2xl text-white group-hover:text-red-500 " />
                                    <h3 className="text-base text-white group-hover:text-red-500 font-semibold ">
                                        Viagens
                                    </h3>
                                </div>
                            </Link>

                            <Link href="/painel/report/expense">
                                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <TbReportAnalytics className="text-2xl text-white group-hover:text-red-500 " />
                                    <h3 className="text-base text-white group-hover:text-red-500 font-semibold ">
                                        Relat??rios
                                    </h3>
                                </div>
                            </Link>



                            {/* <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Comments
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Analytics
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Messages
                                </h3>
                            </div>
                            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Integration
                                </h3>
                            </div> */}
                        </div>
                        {/* setting  */}
                        {/* <div className=" my-4 border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    Settings
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                    More
                                </h3>
                            </div>
                        </div> */}
                        {/* logout */}
                        {/* <div className=" my-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <MdOutlineLogout className="text-2xl text-white group-hover:text-red-500 " />
                                <button onClick={handleLogout} type="button">
                                    <h3 className="text-base text-white group-hover:text-red-500 font-semibold ">
                                        Logout
                                    </h3>
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Disclosure >
        </div >
    )
}

export default MyApp
