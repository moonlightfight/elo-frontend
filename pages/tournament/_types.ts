interface MatchInfo {
  winnerId: number;
  winnerName: string;
  loserId: number;
  loserName: string;
  winnerScore: number;
  loserScore: number;
  matchDate: string;
}

interface PlayerInfo {
  id: number;
  name: string;
  place: number;
}

export interface TournamentInfo {
  title: string;
  numPlayers: number;
  tournamentDate: string;
  matches: MatchInfo[];
  players: PlayerInfo[];
}