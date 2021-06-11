import Head from 'next/head'
import {useState} from 'react'
import axios from 'axios'

import type {TournamentInfo} from './_types'

export default function Add() {
  const [tournament, setTournament] = useState<TournamentInfo|null>(null)
  const [tournamentUrl, setTournamentUrl] = useState<string>("")

  const getTournamentInfo = async (e): void => {
    e.preventDefault()
    try {
      const res = await axios({
        method: "GET",
        url: `/api/tournament/getfromweb`,
        params: {
          url: tournamentUrl
        }
      })
      setTournament(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Add Tournament - SMS Global Rankings</title>
      </Head>
      <h2 className="text-center text-xl font-bold">Add Tournament</h2>
      <form onSubmit={getTournamentInfo}>
        <fieldset>
          <input type="text" name="tournamentUrl" value={tournamentUrl} onChange={e => {
            setTournamentUrl(e.target.value)
          }} placeholder="Input Smash.gg or Challonge URL" />
          <button className="button">Get tournament info</button>
        </fieldset>
      </form>
      {tournament && (
        <div>
          <p>tournament retrieved lesgo</p>
        </div>
      )}
    </div>
  )
}