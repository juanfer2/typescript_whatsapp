import { IResolvers } from '@graphql-tools/utils'
import { authenticated } from '../../middlewares/auth-guard'
import { MessageResponse } from '../generated'

export const HealtResolver: IResolvers = {
  Query: {
    async healt(_: void, arg: void, context): Promise<MessageResponse> {
      return {
        status: "OK"
      }
    }
  },
  Mutation: {
    healt: authenticated(async (_: void, arg: void, context: any): Promise<MessageResponse> => {
      return {
        status: "OK"
      }
    })
  }
}
