import { Prisma, User } from '@prisma/client';
import { isEmpty } from '../../../utils/validation_util';
import prisma, { user } from '../../../clients/prisma_client';

interface Where {
  conditions?: object,
  orderBy?: object,
  select?: any,
  include?: never,
}

class UserRepository {
  constructor() {}

  async create(inputUser: any): Promise<User | null> {
    return await prisma.user.create({data: {...inputUser}})
  }

  async all(): Promise<User[]>{
    return await prisma.user.findMany()
  }

  async update({condition, data}: any): Promise<User | null>{
    return await user.update({where: condition, data})
  }

  async update_all({condition, data}: any): Promise<any>{
    return await user.updateMany({where: condition, data})
  }

  async findById(id: number): Promise<User | null>{
    return await user.findUnique({where: {id}})
  }

  async findBy(condition: object = {}): Promise<User | null>{
    return await user.findUnique({where: condition})
  }

  async where({conditions, orderBy = {}, select, include}: Where): Promise<User[]>{
    let query: object = {where: conditions, orderBy}
    query = this._appendQuery(query, [select, include])
    return await user.findMany(query)
  }

  async deleteById(id: number): Promise<any>{
    return await user.delete({
      where: {
        id: id
      },
    })
  }

  private _appendQuery(query: any, options: Array<object>): any{
    options.reduce((queryBuild: object, option: object) => {
      if (isEmpty(queryBuild)) {
        queryBuild = query
      }

      if (!isEmpty(option)) {
        queryBuild = this._buildQuery(queryBuild, options)
      }

      return queryBuild
    })
  }

  private _buildQuery(query: any, field: any) : any{
    return query = {
      ...query,
      field,
    }
  }
}

export default UserRepository;
