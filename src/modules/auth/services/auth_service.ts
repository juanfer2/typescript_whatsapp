import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import logger from "../../../utils/logger/logger_util";
import UserRepository from "../repositories/user_repository";
import { encryptPassword } from "./password_service";

class AuthServices {
  private PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
  private expirationDate = 24 * 50 * 60;

  constructor(
    private  userRepository: UserRepository
  ){}

  async register(userInput: any) {
    try {
      userInput.password = encryptPassword(userInput.password)
      const user: any = await this.userRepository.create(userInput);
      user.token = this._generateWebToken(user.id)
    } catch (error) {
      logger.error(error)
      return error
    }
  }

  async verifyToken(token: string): Promise<any> {
    const tokenUser = await jwt.verify(token, this.PRIVATE_KEY);

    if (tokenUser) {
      return tokenUser;
    }

    return null;
  }
/*
  async login(inputData: any): Promise<any> {
    try {
      const user = await this.authRepository.findOne({
        email: inputData.email,
      });
      if (user) {
        const currentPassword: string = user.password;
        const userIsValid = await this.authRepository.comparedPassword(
          inputData.password,
          currentPassword
        );
        logger.info("user", userIsValid);
        if (userIsValid) {
          logger.info("Es válido");
          user.token = await this.generateWebToken(user.id);
        } else {
          logger.info("No válido");
        }
        return user;
      } else {
        return false;
      }
      // return user
    } catch (error) {
      logger.error(error);
    }
  }
*/
  private async _generateWebToken(id: string): Promise<any> {
    try {
      const token = await jwt.sign({ id }, this.PRIVATE_KEY, {
        expiresIn: this.expirationDate,
      });
      return token;
    } catch (error) {
      // console.log(error);
    }
  }
}
