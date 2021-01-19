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
  color: string,
  id: any
}

interface TabData {
  TAB_LEVELS: number,
  TAB_FREE: number,
  TAB_MYSKINS: number,
  TAB_FAVORITES: number,
  TAB_SUBMITSKIN: number
}

interface SkinConfig {
  listUrl: string;
  searchUrl: string;
  submitUrl: string;
  skinBase: string;
  favoriteUrl: string;
  fallbackUploadUrl: string;
}

interface SkinData {
  id: number,
  skinRoute: string,
  skinName: string
}

class SkinProfile {
  public skinId1: number = 0;
  public skinId2: number = 0;
}

class Profile {
  public experience: number = 0;
  public favorites: Array<number> = [];
  public realName: string = '';
  public id: number = 0;
  public avatarURL: string = '';

  public skinProfiles: Map<number, SkinProfile> = new Map<number, SkinProfile>();
  public skinRoutes: Map<number, string> = new Map<number, string>();

  constructor() {

  }
}

export {
  Point,
  LeaderboardEntry,
  RankingEntry,
  ServerListEntry,
  ProfileData,
  LeaderboardSlot,
  Profile,
  SkinConfig,
  SkinData,
  TabData
};
