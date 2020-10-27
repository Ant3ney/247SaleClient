interface Point {
  x: number;
  y: number;
};

interface LeaderboardEntry {
  playerID: number,
  score: number
}

interface RankingEntry {
  teamID: number,
  rate: number
}

interface ServerListEntry {
  IP: string,
  count: string,
  id: number,
  maxPlayers: number,
  mode: string,
  name: string,
  numPlayers: number,
  numSpectors: number,
  region: string,
  version: string
}

interface ProfileData {
  nick?: string,
  skin1?: string,
  skin2?: string
}

interface LeaderboardSlot {
  name: string,
  score: number,
  color: string
}

export {
  Point,
  LeaderboardEntry,
  RankingEntry,
  ServerListEntry,
  ProfileData,
  LeaderboardSlot
};
