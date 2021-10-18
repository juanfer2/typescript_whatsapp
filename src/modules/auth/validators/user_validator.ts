import {
  validate,
  validateOrReject,
  Contains,
  IsNotEmpty,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  Validator, Validate
} from "class-validator";
import { isEmpty } from "lodash";
import ValidatorError from '../../../utils/handler_errors/validator_errors'

class UserValidator {
  constructor({name, username, password}: any){
    this.username = username;
    this.name = name;
    this.password = password;
  }

  @IsNotEmpty({
    message: "El nombre no puede estar vacío",
  })
  name: string;

  @IsNotEmpty({
    message: "El username no puede estar vacío",
  })
  username: string;

  @IsNotEmpty({
    message: "El password no puede estar vacío",
  })
  password: string;

  async validError(): Promise<Error | void> {
    const error: any = await validate(new UserValidator(this))
    if (!isEmpty(error)) throw new ValidatorError(error)
  }
}

export default UserValidator;
