import { room } from '../../../clients/prisma_client';

class Room {
  public name: string;

  constructor(name?: string){
    this.name = name || ''
  }

  async create(): Promise<any>{
    return await room.create({data: {name: this.name}})
  }
}

export default Room;
