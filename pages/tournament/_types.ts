export interface MatchInfo {
  winnerId: number;
  winnerName: string;
  loserId: number;
  loserName: string;
  winnerScore: number;
  loserScore: number;
  matchDate: string;
}

export interface PlayerInfo {
  id: number;
  name: string;
  place: number;
}

export interface TournamentInfo {
  title: string;
  numPlayers: number;
  tournamentDate: string;
  location: string | null;
  replay: string | null;
  matches: MatchInfo[];
  players: PlayerInfo[];
}

export interface ApiPlayer {
  _id: string;
  slug: string;
  username: string;
  country: string;
  ranking: number;
  points: number;
  controller: string;
  realName: string;
  twitter: string;
  twitch: string;
  picture: string;
  team: {
    _id: string;
    slug: string;
    name: string;
  };
  tournaments: string[];
  matches: string[];
  mainCharacter: string;
  subCharacters: string[];
}

export interface Character {
  _id: string;
  name: string;
  imageLink: string;
}