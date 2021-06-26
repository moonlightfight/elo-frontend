import Header from '../components/common/Header'
import UserContextProvider from '../contexts/UserContext'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../i18n'

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

export default MyApp
