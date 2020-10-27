class ClientData {
  id: number;
  isBot: boolean;
  nick: string;
  tag: string;
  teamColor: string;

  constructor(id: number = -1, isBot: boolean = false, nick: string = '', tag: string = '', teamColor: string = '#ffffff') {
    this.id = id;
    this.isBot = isBot;
    this.nick = nick;
    this.tag = tag;
    this.teamColor = teamColor;
  }
}

export default ClientData;
