import { IResolvers } from '@graphql-tools/utils'
import { MessageResponse } from '../generated'

export const HealtResolver: IResolvers = {
  Query: {
    async healt(_: void): Promise<MessageResponse> {
      return {
        status: "OK"
      }
    }
  },
  Mutation: {
    async healt(_: void): Promise<MessageResponse> {
      return {
        status: "OK"
      }
    }
  }
}
