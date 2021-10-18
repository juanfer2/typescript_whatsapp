import { Service } from "typedi";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import logger from "../../../utils/logger/logger_util";
import UserRepository from "../repositories/user_repository";
import { encryptPassword, comparedPassword } from "./password_service";
import { Prisma } from '@prisma/client'
import UserValidator from "../validators/user_validator";
import {validate} from 'class-validator';

@Service()
class AuthService {
  private PRIVATE_KEY: string = process.env.PRIVATE_KEY || '';
  private expirationDate = 24 * 50 * 60;
  private  userRepository: UserRepository = new UserRepository;

  constructor(
  ){}

  async register(userInput: any): Promise<any>{
    try {
      const validateUser = new UserValidator(userInput)
      await validateUser.validError()
      userInput.password = await encryptPassword(userInput.password)
      const user: any = await this.userRepository.create(userInput);
      user.token = this._generateWebToken(user.id)

      return user
    } catch (error: any) {
      throw error
    }
  }

  async verifyToken(token: string): Promise<any> {
    const tokenUser = await jwt.verify(token, this.PRIVATE_KEY);

    if (tokenUser) {
      return tokenUser;
    }

    return null;
  }

  async login(inputData: any): Promise<any> {
    try {
      const user: any = await this.userRepository.findBy({
        username: inputData.username,
      });

      if (user) {
        const currentPassword: string = user.password;

        const userIsValid = await comparedPassword(
          inputData.password,
          currentPassword
        );

        if (userIsValid) {
          user.token = await this._generateWebToken(user.id);
        } else {
          return false;
        }
      } else {
        return false;
      }

      return user;
    } catch (error) {
      logger.error(error);
    }
  }

  private async _generateWebToken(id: string): Promise<any> {
    try {
      const token = await jwt.sign({ id }, this.PRIVATE_KEY, {
        expiresIn: this.expirationDate,
      });

      return token;
    } catch (error) {
      logger.error(error);
    }
  }
}

export default AuthService;
