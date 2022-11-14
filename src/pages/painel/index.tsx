import AdminDashboard from './dashboard'
import SideBarMenu from '../../components/SideBarMenu'
import NavBar from '../../components/NavBar'

type Props = {
    title: string
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[]
}

export default function Painel({ children }: Props) {
    return (
        <>
            <NavBar />
            <div className="mt-16 sm:ml-0 lg:ml-60 flex content-center">
                {children || <AdminDashboard />}
            </div>
            <SideBarMenu />
        </>
    )
}
