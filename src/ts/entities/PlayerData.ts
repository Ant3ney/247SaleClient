import ClientData from "./ClientData";

class PlayerData {
  id: number;
  parentClientID: number;
  parentClient: ClientData;
  color: string;
  skinURL: string;

  constructor(id: number = -1, parentClientID: number = -1, color: string = '#858585', skinURL: string = '') {
    this.id = id;
    this.parentClientID = parentClientID;
    this.parentClient = new ClientData();
    this.color = color;
    this.skinURL = skinURL;
  }
}

export default PlayerData;
