import { useState, useContext } from "react"
import axios from 'axios'
import Head from "next/head"
import { UserContext } from "../../contexts/UserContext"

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const {setLogin} = useContext(UserContext)

  async function submitLogin(e): Promise<void> {
    e.preventDefault()
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
          <input type="text" name="email" className="w-full mb-4 border-blue-200 border-b-4 rounded-md px-2 py-1 focus:border-pink-200" value={email} onChange={e => {
            setEmail(e.target.value)
          }} placeholder="Email address" />
          <input type="password" name="password" className="w-full mb-4 border-blue-200 border-b-4 rounded-md px-2 py-1 focus:border-pink-200" value={password} onChange={e => {
            setPassword(e.target.value)
          }} placeholder="Password" />
          <button className="button" type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  )
}