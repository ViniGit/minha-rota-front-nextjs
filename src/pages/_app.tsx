import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/global.scss'
import "react-datepicker/dist/react-datepicker.css"

type Props = {
  title: string
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[]
}


type AppLayoutProps = {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: AppLayoutProps) {

  const Layout = Component.layout || (({ children }: Props) => <>{children}</>)

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
