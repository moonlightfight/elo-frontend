import Link from 'next/link'
import {useContext} from 'react'
import { UserContext } from '../../contexts/UserContext'


export default function Header() {
  const {token, doLogout} = useContext(UserContext)
  return (
    <div className="bg-hero w-full h-96 bg-top bg-fixed relative shadow-md">
      <div className="font-heading absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-200 text-center">
        <h1 className="text-5xl">Sailor Moon S Global Rankings</h1>
        <h2 className="text-2xl">Who's the best at fighting evil by moonlight?</h2>
      </div>
      <div className={`absolute right-4 top-4 font-body flex ${token === null ? 'w-48' : 'w-96'} justify-around`}>
        <Link href="/">
          <a className="button">
            Home
          </a>
        </Link>
        {
          token === null ? (
            <Link href="/login">
              <a className="button">
                Login
              </a>
            </Link>
          ) : (
            <>
              <Link href="/add-user">
                <a className="button">
                  Add Admin
                </a>
              </Link>
              <button className="button" onClick={e => {
                e.preventDefault();
                doLogout()
              }}>Logout</button>
            </>
          )
        }
      </div>
    </div>
  )
}