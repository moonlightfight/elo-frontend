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
      <h2 className="text-center text-xl font-bold mt-4">Add Tournament</h2>
      <form onSubmit={getTournamentInfo} className="mx-auto w-1/3 p-4">
        <fieldset disabled={tournament !== null}>
          <input type="text" name="tournamentUrl" className="text-field" value={tournamentUrl} onChange={e => {
            setTournamentUrl(e.target.value)
          }} placeholder="Input Smash.gg or Challonge URL" />
          <button className="button" disabled={tournament !== null}>Get tournament info</button>
        </fieldset>
      </form>
      {tournament && (
        <>
          <h3 className="text-center text-xl font-bold mt-4">Please check and validate the following tournament information</h3>
          <form>
            <fieldset>
              <div className="w-1/3 mx-auto p-4">
                <input type="text" className="text-field" placeholder="Tournament Name" value={tournament.title} onChange={e => {
                  setTournament({...tournament, title: e.target.value})
                }} />
              </div>
            </fieldset>
          </form>
        </>
      )}
    </div>
  )
}