import Header from '../components/common/Header'
import UserContextProvider from '../contexts/UserContext'
import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <UserContextProvider>
        <Header />
        <div className="font-body">
          <Component {...pageProps} />
        </div>
      </UserContextProvider>
    </div>
  )
}

export default appWithTranslation(MyApp)
