import { user } from '../../../clients/prisma_client';

class UpdateStatusService {
  public status: boolean;
  public id: number;

  constructor(status: boolean, id: number) {
    this.status = status;
    this.id = id;
  }

  async updateStatus() {
    await user.update({where: {id: this.id}, data: {online: this.status}})
  }
}

export default UpdateStatusService;
