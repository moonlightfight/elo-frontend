import { useState, useContext } from "react"
import axios from 'axios'
import Head from "next/head"
import {useRouter} from 'next/router'
import { UserContext } from "../../contexts/UserContext"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()
  
  async function submitLogin(e): Promise<void> {
    e.preventDefault()
    const { setLogin } = useContext(UserContext)
    try {
      const res = await axios({
        method: "POST",
        url: "/api/admin/login",
        data: {
          email,
          password
        }
      })
      const {token, _id} = res.data
      setLogin(token, _id)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mx-auto w-1/3 p-4">
      <Head>
        <title>Login - SMS Global Rankings</title>
      </Head>
      <h2 className="text-center text-xl font-bold">Admin Login</h2>
      <form className="mt-4" onSubmit={submitLogin}>
        <fieldset>
          <input type="text" name="email" className="text-field" value={email} onChange={e => {
            setEmail(e.target.value)
          }} placeholder="Email address" />
          <input type="password" name="password" className="text-field" value={password} onChange={e => {
            setPassword(e.target.value)
          }} placeholder="Password" />
          <button className="button" type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  )
}