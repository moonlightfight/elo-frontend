import Head from 'next/head'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { TournamentInfo, PlayerInfo, MatchInfo, Character, ApiPlayer, PlayerSetup } from './_types'
import { getCountry } from '../../helpers/countries'
import type { CountryInfo } from '../../helpers/_types'
import { UserContext } from '../../contexts/UserContext'

export default function Add() {
  const [tournament, setTournament] = useState<TournamentInfo|null>(null)
  const [tournamentUrl, setTournamentUrl] = useState<string>("")
  const [countries, setCountries] = useState<CountryInfo[]>([])
  const [playerApi, setPlayerApi] = useState<ApiPlayer[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [players, setPlayers] = useState<PlayerSetup[]>([])
  const {token} = useContext(UserContext)
  const router = useRouter()

  const getData = useCallback(async () => {
    await assignCountries();
    await assignCharacters();
    await assignPlayers();
  }, [])

  const assignCountries = async () => {
    if (countries.length === 0) {
      const countryData: CountryInfo[] = await getCountry();
      setCountries(countryData)
    }
  }
  
  const assignPlayers = async () => {
    if (playerApi.length === 0) {
      const res = await axios.get('/api/player')
      setPlayerApi(res.data.players)
    }
  }

  const addPlayer = async (name: string): Promise<string> => {
    try {
      const res = await axios({
        method: "POST",
        url: "/api/player",
        data: {
          name
        }
      })
      return res.data.InsertedID
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [getData])
  
  const assignCharacters = async () => {
    if (characters.length === 0) {
      try {
        const res = await axios.get('/api/character')
        setCharacters(res.data)
      } catch (e) {
        console.log(e)
      }
    }
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
      res.data.players.sort((x, y) => {
        if (x.place > y.place) {
          return 1;
        }
        if (x.place < y.place) {
          return -1
        }
        return 0;
      })
      setTournament(res.data)
      const playerArr: PlayerSetup[] = res.data.players.map(player => {
        return {
          name: player.name
        }
      });
      setPlayers(playerArr)
    } catch (err) {
      console.log(err)
    }
  }

  const submitTournament = async (e): Promise<void> => {
    e.preventDefault();
    const tournamentPlayers: PlayerInfo[] = tournament.players
    const matches: MatchInfo[] = tournament.matches;
    players.forEach((player, index) => {
      tournamentPlayers[index].name = player.name
      tournamentPlayers[index].characters = player.characters;
    })
    matches.forEach(match => {
      const winner = tournamentPlayers.findIndex(x => {
        return x.id === match.winnerId
      })
      const loser = tournamentPlayers.findIndex(x => {
        return x.id === match.loserId
      })
      match.winnerName = tournamentPlayers[winner].name
      match.loserName = tournamentPlayers[loser].name
    })
    tournamentPlayers.forEach((player, index) => {
      if (players[index]._id) {
        player.id = players[index]._id
      } else {
        player.id = ""
      }
    })
    matches.forEach(match => {
      const winner = players.findIndex(x => {
        return x.name === match.winnerName
      })
      const loser = players.findIndex(x => {
        return x.name === match.loserName
      })
      match.winnerId = players[winner]._id
      match.loserId = players[loser]._id
    })
    setTournament({...tournament, players: tournamentPlayers, matches})
    try {
      await axios({
        method: 'POST',
        url: '/api/tournament',
        data: {
          token,
          tournament
        }
      })
      router.push("/")
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
          <form onSubmit={submitTournament}>
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

                <p>Event date:</p>
                <DatePicker value={new Date(tournament.tournamentDate)} onChange={value => {
                  setTournament({...tournament, tournamentDate: value.toISOString()})
                }} />

                <p>Youtube Replay:</p>
                <input type="text" className="text-field" placeholder="Youtube Replay" value={tournament.replay} onChange={e => {
                  setTournament({...tournament, replay: e.target.value})
                }} />
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
                        <Creatable 
                          classNamePrefix="dropdown-select" 
                          className="dropdown-select"
                          placeholder="Choose player..."
                          options={playerApi ? playerApi.map(player => {
                            return {
                              label: player.username,
                              value: player._id,
                            }
                          }) : null} 
                          onChange={async action => {
                            const playerList = players;
                            let id: string;
                            switch (action.value) {
                              case action.label:
                                id = await addPlayer(action.label)
                                break;
                              default:
                                id = action.value
                                break;
                            }
                            playerList[index] = {
                              _id: id,
                              name: action.label,
                              characters: []
                            };
                            setPlayers([...playerList])
                        }} />
                      </div>
                      <div>
                        <Select 
                        isMulti={true} 
                        className="dropdown-select" 
                        classNamePrefix="dropdown-select" 
                        placeholder="Choose characters used..." 
                        options={characters.map(character => {
                          return {
                            label: character.name,
                            value: character._id
                          }
                        })}
                        onChange={(action) => {
                          const playerList = players;
                          playerList[index].characters = action.map(char => {
                            return char.value
                          })
                          setPlayers([...playerList])
                        }} />
                      </div>
                    </React.Fragment>
                  )
                })}
                <button type="submit" className="button mt-4">Add tournament</button>
              </div>
            </fieldset>
          </form>
        </>
      )}
    </div>
  )
}