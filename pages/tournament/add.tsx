import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Select from 'react-select'
import Creatable from 'react-select/creatable'

import type {TournamentInfo} from './_types'
import { getCountry } from '../../helpers/countries'
import { CountryInfo } from '../../helpers/_types'

export default function Add() {
  const [tournament, setTournament] = useState<TournamentInfo|null>(null)
  const [tournamentUrl, setTournamentUrl] = useState<string>("")
  const [countries, setCountries] = useState<CountryInfo[]>([])
  const [players, setPlayers] = useState<string[]>([])

  useEffect(() => {
    assignCountries();
  })

  const assignCountries = async () => {
    const countryData: CountryInfo[] = await getCountry();
    setCountries(countryData)
  }

  const getTournamentInfo = async (e): Promise<void> => {
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
      const playerArr: string[] = res.data.players.map(player => {
        return player.name
      });
      setPlayers(playerArr)
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
                <p>Event:</p>
                <input type="text" className="text-field" placeholder="Tournament Name" value={tournament.title} onChange={e => {
                  setTournament({...tournament, title: e.target.value})
                }} />

                <p>Event country:</p>
                <Select className="dropdown-select" options={countries.map(country => {
                  return {
                    label: country.name,
                    value: country.alpha3Code
                  }
                })} onChange={action => {
                  setTournament({...tournament, location: action.value})
                }}
                classNamePrefix="dropdown-select" />
              </div>
              <p className="w-2/5 mx-auto">Player list:</p>
              <div className="w-2/5 mx-auto p-4 grid player-grid">
                {tournament.players.map((player, index) => {
                  return (
                    <React.Fragment key={player.id}>
                      <div>
                        <p>{player.name}</p>
                      </div>
                      <div>
                        <Creatable defaultValue={{label: players[index]}} value={{label: players[index]}} classNamePrefix="dropdown-select" className="dropdown-select" onChange={action => {
                          const playerList = players;
                          playerList[index] = action.label;
                          setPlayers([...playerList])
                        }} />
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
            </fieldset>
          </form>
        </>
      )}
    </div>
  )
}