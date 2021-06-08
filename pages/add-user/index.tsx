import {useState} from 'react'
import axios from 'axios';
import Head from 'next/head';

export default function AddUser() {
  interface NewUser {
    email: string;
    username: string;
    password: string;
  }
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [newUser, setNewUser] = useState<NewUser|null>(null);
  const [copied, setCopied] = useState<boolean>(false)
  const submitNewUser = async (e): Promise<void> => {
    e.preventDefault();
    const rng: number = Math.floor(Math.random() * 100000);
    const password: string = `${username.replace(' ', '').toLowerCase()}-${rng}`
    try {
      await axios({
        method: "POST",
        url: "/api/admin",
        data: {
          email,
          username,
          password
        }
      })
      setNewUser({email, username, password})
    } catch (e) {
      console.log(e)
    }
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    const string: string = `Email: ${newUser.email} \nUsername: ${newUser.username} \nPassword: ${newUser.password}`
    let tempInput: HTMLTextAreaElement = window.document.createElement("textarea");
    window.document.body.appendChild(tempInput);
		tempInput.value = string;
		tempInput.select();
		document.execCommand("copy");
		window.document.body.removeChild(tempInput);
  }

  return (
    <div className="mx-auto w-1/3 p-4">
      <Head>
        <title>Add User - SMS Global Rankings</title>
      </Head>
      {newUser === null ? (
          <>
            <h2 className="text-center text-xl font-bold">Create Admin</h2>
            <form className="mt-4" onSubmit={submitNewUser}>
              <fieldset>
                <input type="text" name="email" className="text-field" value={email} onChange={e => {
                  setEmail(e.target.value)
                }} placeholder="Email address" />
                <input type="text" name="username" className="text-field" value={username} onChange={e => {
                  setUsername(e.target.value)
                }} placeholder="Username" />
                <button className="button" type="submit">Create User</button>
              </fieldset>
            </form>
          </>
        ) : (
          <>
            <p><span className="font-bold">Email:</span> {newUser.email}</p>
            <p><span className="font-bold">Username:</span> {newUser.username}</p>
            <p><span className="font-bold">Password:</span> {newUser.password}</p>
            <button className="button" onClick={copyToClipboard} disabled={copied}>{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
          </>
        )
      }
    </div>
  )
}