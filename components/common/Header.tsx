import Link from 'next/link'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { UserContext } from '../../contexts/UserContext'


export default function Header() {
  const { token, doLogout } = useContext(UserContext)
  const { t } = useTranslation()
  return (
    <div className="bg-hero w-full h-96 bg-top bg-fixed relative shadow-md">
      <div className="font-heading absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-200 text-center">
        <h1 className="text-5xl">{t('header.title')}</h1>
        <h2 className="text-2xl">{t('header.subtitle')}</h2>
      </div>
      <div className={`absolute right-4 top-4 font-body flex ${token === null ? 'w-48' : 'w-1/3'} justify-around`}>
        <Link href="/">
          <a className="button">
            {t('header.home')}
          </a>
        </Link>
        {
          token === null ? (
            <Link href="/login">
              <a className="button">
                {t('header.login')}
              </a>
            </Link>
          ) : (
            <>
              <Link href="/tournament/add">
                <a className="button">{t('header.add.tournament')}</a>
              </Link>
              <Link href="/add-user">
                <a className="button">
                  {t('header.add.admin')}
                </a>
              </Link>
              <button className="button" onClick={e => {
                e.preventDefault();
                doLogout()
              }}>{t('header.logout')}</button>
            </>
          )
        }
      </div>
    </div>
  )
}