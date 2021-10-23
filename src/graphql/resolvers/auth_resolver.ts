import { IResolvers } from '@graphql-tools/utils'
import logger from '../../utils/logger/logger_util'
import { LoginInput, User, UserInput } from '../generated'
import AuthService from '../../modules/auth/services/auth_service'
import { UserInputError } from 'apollo-server-errors';


export const AuthResolver: IResolvers = {
  Query: {
    async login(root, arg, context): Promise<User> {
      // logger.info('root', root)
      // console.log(root)
      context.currentUser
      const loginInput: LoginInput = arg.loginInput;
      const authService = new AuthService();

      return await authService.login(loginInput)
    },
  },
  Mutation: {
    async register(_: void, arg): Promise<User | any> {
      try {
        const userInput: UserInput = arg.userInput;
        const authService = new AuthService();

        return await authService.register(userInput);
      } catch (error: any) {
        //throw new UserInputError("Bad Request", { errors: error.shortMessage });
        throw new UserInputError(error, { errors: error });
      }
    }
  }
}
