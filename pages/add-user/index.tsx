import { useState } from 'react'
import axios from 'axios';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

export default function AddUser() {
  interface NewUser {
    email: string;
    username: string;
    password: string;
  }
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [newUser, setNewUser] = useState<NewUser | null>(null);
  const [copied, setCopied] = useState<boolean>(false)
  const { t } = useTranslation();

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
      setNewUser({ email, username, password })
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
    setCopied(true)
  }

  return (
    <div className="mx-auto w-1/3 p-4">
      <Head>
        <title>{t('header.add.admin')} - {t('meta.subtitle')}</title>
      </Head>
      {newUser === null ? (
        <>
          <h2 className="text-center text-xl font-bold">{t('login.heading.add')}</h2>
          <form className="mt-4" onSubmit={submitNewUser}>
            <fieldset>
              <input type="text" name="email" className="text-field" value={email} onChange={e => {
                setEmail(e.target.value)
              }} placeholder={t('login.email')} />
              <input type="text" name="username" className="text-field" value={username} onChange={e => {
                setUsername(e.target.value)
              }} placeholder={t('login.username')} />
              <button className="button" type="submit">{t('login.heading.add')}</button>
            </fieldset>
          </form>
        </>
      ) : (
        <>
          <p><span className="font-bold">{t('login.email')}:</span> {newUser.email}</p>
          <p><span className="font-bold">{t('login.username')}:</span> {newUser.username}</p>
          <p><span className="font-bold">{t('login.password')}:</span> {newUser.password}</p>
          <button className="button" onClick={copyToClipboard} disabled={copied}>{copied ? t('login.clipboard.copied') : t('login.clipboard.copy')}</button>
        </>
      )
      }
    </div>
  )
}