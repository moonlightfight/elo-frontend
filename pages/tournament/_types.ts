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

}

export interface Character {
  _id: string;
  name: string;
  imageLink: string;
}